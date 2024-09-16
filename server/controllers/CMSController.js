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

        const termsconditions = await TermsConditions.findOne({
            attributes: ['terms_conditions']
        });

        return res.status(200).json({
            status: 1,
            message: 'Success',
            privacypolicy: privacypolicy ? privacypolicy.privacypolicy_content : null,
            about: about ? about.about_content : null,
            termsconditions: termsconditions
        });
    } catch (error) {
        console.error("Error fetching CMS content:", error);
        return res.status(500).json({
            status: 0,
            message: 'Failed to fetch CMS content',
            error
        });
    }
};
