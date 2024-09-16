const { PrivacyPolicy, About, TermsConditions } = require('../models');
const apiUrl = process.env.apiUrl;

exports.index = async (req, res) => {
    try {
        const privacypolicy = await PrivacyPolicy.findOne({
            attributes: ['privacypolicy_content']
        });

        const about = await About.findOne({
            attributes: ['about_content']
        });

        let termsconditions = null;
        try {
            termsconditions = await TermsConditions.findOne({
                attributes: ['terms_conditions']
            });
            console.log('Terms and Conditions query result:', termsconditions);
        } catch (termsError) {
            console.error('Error fetching Terms and Conditions:', termsError);
        }

        const response = {
            status: 1,
            message: 'Success',
            privacypolicy: privacypolicy ? privacypolicy.privacypolicy_content : null,
            about: about ? about.about_content : null,
            termsconditions: termsconditions ? termsconditions.terms_conditions : null
        };

        console.log('Full response object:', response);

        return res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching CMS content:", error);
        return res.status(500).json({
            status: 0,
            message: 'Failed to fetch CMS content',
            error: error.message
        });
    }
};