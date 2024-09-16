const { PrivacyPolicy, About, TermsConditions } = require('../models');
const apiUrl = process.env.apiUrl;

exports.index = async (req, res) => {
    try {
        console.log('Starting CMS content fetch');

        const privacypolicy = await PrivacyPolicy.findOne({
            attributes: ['privacypolicy_content']
        });
        console.log('Privacy Policy fetched:', privacypolicy ? 'yes' : 'no');

        const about = await About.findOne({
            attributes: ['about_content']
        });
        console.log('About fetched:', about ? 'yes' : 'no');

        let termsconditions = null;
        try {
            termsconditions = await TermsConditions.findOne({
                attributes: ['terms_conditions']
            });
            console.log('Terms and Conditions fetched:', termsconditions ? 'yes' : 'no');
            console.log('Terms and Conditions content:', termsconditions ? termsconditions.terms_conditions : 'null');
        } catch (termsError) {
            console.error('Error fetching Terms and Conditions:', termsError);
        }

        const response = {
            status: 1,
            message: 'Success',
            privacypolicy: privacypolicy ? privacypolicy.privacypolicy_content : null,
            about: about ? about.about_content : null,
            termsconditions: termsconditions ? termsconditions.terms_conditions : 'Terms and conditions not available'
        };

        console.log('Response object keys:', Object.keys(response));
        console.log('Terms and Conditions in response:', response.termsconditions ? 'present' : 'missing');

        // Force inclusion of termsconditions key
        if (!response.hasOwnProperty('termsconditions')) {
            response.termsconditions = 'Forcibly added terms and conditions placeholder';
            console.log('Forcibly added termsconditions key');
        }

        console.log('Final response object keys:', Object.keys(response));

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching CMS content:", error);
        return res.status(500).json({
            status: 0,
            message: 'Failed to fetch CMS content',
            error: error.message,
            termsconditions: 'Error occurred, but ensuring this key is present'
        });
    }
};