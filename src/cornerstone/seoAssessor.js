let Assessor = require( "../assessor.js" );
let SEOAssessor = require( "../seoAssessor" );

let introductionKeyword = require( "../assessments/seo/introductionKeywordAssessment.js" );
let KeyphraseLength = require( "../assessments/seo/keyphraseLengthAssessment.js" );
let KeywordDensity = require( "../assessments/seo/keywordDensityAssessment.js" );
let MetaDescriptionKeyword = require( "../assessments/seo/metaDescriptionKeywordAssessment.js" );
let MetaDescriptionLength = require( "../assessments/seo/metaDescriptionLengthAssessment.js" );
let SubheadingsKeyword = require( "../assessments/seo/subheadingsKeywordAssessment.js" );
let textCompetingLinks = require( "../assessments/seo/textCompetingLinksAssessment.js" );
let TextImages = require( "../assessments/seo/textImagesAssessment.js" );
let TextLength = require( "../assessments/seo/textLengthAssessment.js" );
let OutboundLinks = require( "../assessments/seo/outboundLinksAssessment.js" );
let internalLinks = require( "../assessments/seo/internalLinksAssessment" );
let titleKeyword = require( "../assessments/seo/titleKeywordAssessment.js" );
let TitleWidth = require( "../assessments/seo/pageTitleWidthAssessment.js" );
let UrlKeyword = require( "../assessments/seo/urlKeywordAssessment.js" );
let LargestKeywordDistance = require( "../assessments/seo/largestKeywordDistanceAssessment.js" );
let SingleH1Assessment = require( "../assessments/seo/singleH1Assessment.js" );

/**
 * Creates the Assessor
 *
 * @param {Object} i18n The i18n object used for translations.
 * @param {Object} options The options for this assessor.
 * @param {Object} options.marker The marker to pass the list of marks to.
 *
 * @constructor
 */
let CornerstoneSEOAssessor = function( i18n, options ) {
	Assessor.call( this, i18n, options );

	this._assessments = [
		introductionKeyword,
		new KeyphraseLength(),
		new KeywordDensity(),
		new MetaDescriptionKeyword(),
		new MetaDescriptionLength( {
			scores:	{
				tooLong: 3,
				tooShort: 3,
			},
		} ),
		new SubheadingsKeyword(
			{
				scores: {
					noMatches: 3,
					oneMatch: 6,
					multipleMatches: 9,
				},
			}
		),
		textCompetingLinks,
		new TextImages( {
			scores: {
				noImages: 3,
				withAltNonKeyword: 3,
				withAlt: 3,
				noAlt: 3,
			},
		} ),
		new TextLength( {
			recommendedMinimum: 900,
			slightlyBelowMinimum: 400,
			belowMinimum: 300,
			farBelowMinimum: 0,

			scores: {
				belowMinimum: -20,
				farBelowMinimum: -20,
			},
		} ),
		new OutboundLinks( {
			scores: {
				noLinks: 3,
			},
		} ),
		internalLinks,
		titleKeyword,
		new TitleWidth(
			{
				scores: {
					widthTooShort: 3,
					widthTooLong: 3,
				},
			}
		),
		new UrlKeyword(
			{
				scores: {
					noKeywordInUrl: 3,
				},
			}
		),
		new LargestKeywordDistance(),
		new SingleH1Assessment(),
	];
};

require( "util" ).inherits( CornerstoneSEOAssessor, SEOAssessor );

module.exports = CornerstoneSEOAssessor;
