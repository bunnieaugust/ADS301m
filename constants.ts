import { Session, Question, QuestionType, SessionInfo } from './types';

export const availableSessions: SessionInfo[] = [
  { id: 13, title: "Session 13: Content Marketing" },
  { id: 14, title: "Session 14: Google Analytics" },
  { id: 15, title: "Session 15: Advanced SEO" },
  { id: 16, title: "Session 16: Google Ads" },
];

const session13Content: Session = {
  title: "Session 13: The Content Marketing Ecosystem",
  subtitle: "Master the fundamentals of how content marketing drives SEO success.",
  topics: [
    {
      title: "SEO Recap: The Three Pillars",
      points: [
        "Crawling & Discoverability: Search engines need to find your pages. A logical site structure is crucial.",
        "Page Relevance: Your content must be relevant to the search terms you want to rank for.",
        "Importance & Authority: Links from other websites act as 'votes', signifying your site's importance. Not all links are equal."
      ]
    },
    {
      title: "How Links are Valued (PageRank)",
      points: [
        "PageRank is the core algorithm that measures a page's importance based on incoming links.",
        "This value (or 'link juice') flows from one page to another through outgoing links.",
        "Key factors in a link's value are the linking page's authority, topical relevance, and the number of other outgoing links on that page.",
        "Tools like Moz (Domain Authority), Ahrefs, and Majestic help estimate a page's authority."
      ]
    },
    {
      title: "Effective Link Building Strategies",
      points: [
        "Focus on promoting your business, not just chasing rankings. Good marketing naturally attracts good links.",
        "Links are like academic citations; they should be earned and editorially given.",
        "Avoid manipulative tactics like buying links, excessive link swapping, or stuffing ballot boxes.",
      ]
    },
    {
      title: "Guest Posting: Quality over Quantity",
      points: [
        "Guest posting involves creating high-value content for another website to earn a link back to yours.",
        "The most valuable guest post links come from high-authority sites that are topically relevant to your business.",
        "Quality trumps quantity. A few powerful, relevant links are far more valuable than hundreds of low-quality ones.",
        "Avoid guest post spam: ensure your link fits naturally and avoid sites that are clearly just selling links."
      ]
    },
    {
      title: "The Content Marketing Ecosystem",
      points: [
        "Content Marketing builds reputation and is the best way to earn high-quality, natural links.",
        "Use 'Bank Shots': Create great content on your site, get links to it, and that content then links to your important 'money pages'.",
        "Leverage 'Other People's Audiences' (OPA) through guest posts and social media to build your own audience from scratch.",
        "POEM Model: A framework for content distribution consisting of Paid (ads), Owned (your site), and Earned (shares, mentions, links) media."
      ]
    }
  ]
};

const session14Content: Session = {
  title: "Session 14: Google Analytics Fundamentals",
  subtitle: "Understand how to measure and analyze your website traffic to make data-driven decisions.",
  topics: [
    {
      title: "What is Google Analytics?",
      points: [
        "A free web analytics service that tracks and reports website traffic.",
        "It helps you understand your audience, how they find your site, and what they do once they're there.",
        "The latest version is Google Analytics 4 (GA4), which focuses on an event-based data model."
      ]
    },
    {
      title: "How Google Analytics Works",
      points: [
        "A small piece of JavaScript, called the tracking code, is placed on every page of your website.",
        "When a user visits a page, this code collects anonymous information about their interaction.",
        "This data is sent to Google's servers, processed, and organized into the reports you see in your GA account."
      ]
    },
    {
      title: "Key Metrics & Dimensions",
      points: [
        "Metrics are quantitative measurements (the numbers). Examples: Users, Sessions, Bounce Rate, Conversion Rate.",
        "Dimensions are attributes of your data (the descriptions). Examples: Traffic Source, Medium, Country, Page Title.",
        "Metrics and dimensions work together. You analyze metrics across different dimensions (e.g., Users from the United States)."
      ]
    },
    {
      title: "Core Reports: The ABCs",
      points: [
        "Audience: Who are your users? (Demographics, Location, Devices).",
        "Acquisition: How do users get to your site? (Organic, Paid, Social, Direct).",
        "Behavior: What do users do on your site? (Landing Pages, Site Content, Site Speed).",
        "Conversions: Are users completing valuable actions? (Goal Completions, Ecommerce transactions)."
      ]
    },
    {
      title: "Setting Up Goals & Conversions",
      points: [
        "A 'conversion' is a completed activity that is important to the success of your business.",
        "Examples: Making a purchase, submitting a contact form, signing up for a newsletter.",
        "Setting up goals in GA allows you to measure how often users complete these specific actions.",
        "Tracking conversions is essential for calculating ROI and understanding the value of your marketing efforts."
      ]
    }
  ]
};

const session15Content: Session = {
  title: "Session 15: Advanced SEO Techniques",
  subtitle: "Move beyond the basics with technical, on-page, and off-page strategies to dominate search rankings.",
  topics: [
    {
      title: "Technical SEO",
      points: [
        "Ensures your site can be crawled and indexed efficiently by search engines.",
        "Key elements include: XML Sitemaps (a map of your site), Robots.txt (rules for crawlers), and Site Speed (how fast pages load).",
        "Mobile-First Indexing: Google primarily uses the mobile version of your content for indexing and ranking.",
        "HTTPS: A secure website (https://) is a confirmed, albeit small, ranking factor."
      ]
    },
    {
      title: "Advanced On-Page SEO",
      points: [
        "Title Tags & Meta Descriptions: Optimize these for both keywords and click-through rate (CTR). They are your ad copy in the search results.",
        "Header Tags (H1, H2, H3): Create a logical structure for your content, making it easy for users and search engines to understand.",
        "Internal Linking: Strategically link to other relevant pages on your own site to distribute PageRank and help users navigate.",
        "Image SEO: Use descriptive filenames and ALT text to help search engines understand your images."
      ]
    },
    {
      title: "Schema Markup (Structured Data)",
      points: [
        "Code that you add to your website to help search engines return more informative results for users.",
        "It can create 'Rich Snippets' in search results, like star ratings, prices, and event dates.",
        "Rich snippets can significantly increase your click-through rate from search results.",
        "Common formats are JSON-LD (recommended by Google), Microdata, and RDFa."
      ]
    },
    {
      title: "Local SEO",
      points: [
        "Optimizing your online presence to attract more business from relevant local searches.",
        "The cornerstone is a well-optimized Google Business Profile (formerly Google My Business).",
        "Key factors include NAP consistency (Name, Address, Phone), local citations (mentions on other sites), and customer reviews."
      ]
    },
    {
      title: "Voice Search Optimization",
      points: [
        "Users are increasingly using voice assistants (Siri, Alexa, Google Assistant) to search.",
        "Voice queries are often longer and more conversational (e.g., 'What is the best SEO agency near me?').",
        "Optimize by answering questions directly, using natural language, and targeting long-tail keywords. Earning 'Position Zero' (Featured Snippets) is key."
      ]
    }
  ]
};

const session16Content: Session = {
  title: "Session 16: Google Ads Campaign Mastery",
  subtitle: "Learn to structure, manage, and optimize Google Ads campaigns for maximum return on investment.",
  topics: [
    {
      title: "Google Ads Account Structure",
      points: [
        "The hierarchy is: Account > Campaign > Ad Group > Ads & Keywords.",
        "Campaigns control major settings like budget, location targeting, and bidding strategy.",
        "Ad Groups contain a small, tightly-themed set of keywords and the ads that are relevant to them.",
        "This structure ensures that users searching for a specific keyword see a highly relevant ad."
      ]
    },
    {
      title: "Keyword Match Types",
      points: [
        "Broad Match: Reaches the widest audience, can show for synonyms and related searches. (Symbol: keyword)",
        "Phrase Match: Shows for searches that include the meaning of your keyword. (Symbol: \"keyword\")",
        "Exact Match: Shows for searches that are the same meaning as the keyword. (Symbol: [keyword])",
        "Choosing the right match types is crucial for controlling costs and targeting the right audience."
      ]
    },
    {
      title: "Quality Score & Ad Rank",
      points: [
        "Quality Score (1-10) is Google's rating of the quality and relevance of your keywords and ads. It's based on CTR, ad relevance, and landing page experience.",
        "Ad Rank determines your ad position. The formula is: Ad Rank = Max CPC Bid × Quality Score.",
        "A high Quality Score allows you to get better ad positions for a lower cost per click (CPC)."
      ]
    },
    {
      title: "Bidding Strategies",
      points: [
        "Manual CPC: You set your own maximum cost-per-click for your ads.",
        "Automated Bidding: Google sets bids for you based on your goals. Examples include Maximize Clicks, Target CPA (Cost Per Acquisition), and Target ROAS (Return On Ad Spend).",
        "Choosing a strategy depends on your campaign goals, whether it's traffic, leads, or sales."
      ]
    },
    {
      title: "Ad Extensions",
      points: [
        "Extra pieces of information that expand your ad with more details, such as a phone number, location, or links to specific pages.",
        "They make your ad more prominent, increase click-through rate (CTR), and provide more value to the user.",
        "Common extensions include Sitelinks, Callouts, Structured Snippets, and Location Extensions. They are free to add."
      ]
    }
  ]
};

const session13Questions: Question[] = [
  // Multiple Choice
  { id: 1, type: QuestionType.MULTIPLE_CHOICE, questionText: "In SEO, links from other websites are most commonly compared to what?", options: ["Advertisements", "Votes", "Signposts", "Contracts"], correctAnswer: "Votes" },
  { id: 2, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the name of Google's core algorithm for valuing links?", options: ["LinkRank", "SiteScore", "PageRank", "DomainRank"], correctAnswer: "PageRank" },
  { id: 3, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of these metrics, once visible in a Google Toolbar, is now obsolete?", options: ["Domain Authority", "Page Authority", "Toolbar PageRank", "Trust Flow"], correctAnswer: "Toolbar PageRank" },
  { id: 4, type: QuestionType.MULTIPLE_CHOICE, questionText: "What does the 'POEM' model in content distribution stand for?", options: ["Promote, Own, Engage, Market", "Paid, Owned, Earned, Media", "Paid, Original, Engaging, Media"], correctAnswer: "Paid, Owned, Earned, Media" },
  { id: 5, type: QuestionType.MULTIPLE_CHOICE, questionText: "When evaluating a site for a guest post, which two factors are most important?", options: ["Site age and color scheme", "Number of pages and logo design", "Authority and topical relevance", "Traffic source and ad revenue"], correctAnswer: "Authority and topical relevance" },
  { id: 6, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of the following is considered a 'white-hat' link building strategy?", options: ["Buying links in bulk", "Creating great content that earns links naturally", "Using private blog networks (PBNs)", "Excessive link swapping"], correctAnswer: "Creating great content that earns links naturally" },
  { id: 7, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the concept of a 'Bank Shot' in content marketing?", options: ["Paying for a link directly to a product page", "Creating content that gets links, which then links to your money page", "Getting a link from a financial institution's website", "A link that immediately results in a sale"], correctAnswer: "Creating content that gets links, which then links to your money page" },
  { id: 8, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of the three SEO pillars is most directly influenced by link building?", options: ["Crawling & Discoverability", "Page Relevance", "Importance & Authority", "Site Speed"], correctAnswer: "Importance & Authority" },
  { id: 9, type: QuestionType.MULTIPLE_CHOICE, questionText: "What does 'OPA' stand for in the context of audience building?", options: ["Official Partner Agreement", "Online Promotion Audience", "Other People's Audience", "Optimized Page Audience"], correctAnswer: "Other People's Audience" },
  { id: 10, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which statement about links is true according to the presentation?", options: ["All links are equal", "More links are always better than fewer links", "Links are not equal; quality matters", "Links from social media are the most powerful"], correctAnswer: "Links are not equal; quality matters" },
  { id: 11, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of the following is NOT a tool for assessing link value?", options: ["Moz", "Majestic SEO", "Ahrefs", "Google Analytics"], correctAnswer: "Google Analytics" },
  { id: 12, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the primary goal of the 'Crawling and Discoverability' phase of SEO?", options: ["To rank #1 for a keyword", "To have search engines find all pages on your site", "To get as many links as possible", "To make your site look good"], correctAnswer: "To have search engines find all pages on your site" },
  { id: 13, type: QuestionType.MULTIPLE_CHOICE, questionText: "If a page has high authority and links to 100 other pages, how is its PageRank distributed?", options: ["It's given entirely to the first link", "It's given entirely to the most relevant link", "It's split among all 100 outgoing links", "It is not distributed at all"], correctAnswer: "It's split among all 100 outgoing links" },
  { id: 14, type: QuestionType.MULTIPLE_CHOICE, questionText: "According to link building best practices, you can't...", options: ["...write a guest post.", "...ask for a link.", "...stuff the ballot box.", "...promote your business."], correctAnswer: "...stuff the ballot box." },
  { id: 15, type: QuestionType.MULTIPLE_CHOICE, questionText: "What kind of content is part of the 'Owned' category in the POEM model?", options: ["A newspaper article about your company", "A paid Google Ad", "A blog post on your company's website", "A tweet from an influencer mentioning your product"], correctAnswer: "A blog post on your company's website" },
  { id: 16, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is a major risk of using low-quality or irrelevant infographics for link building?", options: ["They are too expensive to create", "They can be ignored or seen as spam", "They load too slowly on web pages", "They are difficult to share on social media"], correctAnswer: "They can be ignored or seen as spam" },
  { id: 17, type: QuestionType.MULTIPLE_CHOICE, questionText: "The main purpose of guest posting for SEO is to:", options: ["Get paid for writing", "Increase your social media followers", "Earn a high-quality backlink", "Practice your writing skills"], correctAnswer: "Earn a high-quality backlink" },
  { id: 18, type: QuestionType.MULTIPLE_CHOICE, questionText: "Content syndication is when:", options: ["Your content is published on another site", "You create a video version of your blog post", "You delete old content from your site", "You buy links to your content"], correctAnswer: "Your content is published on another site" },
  { id: 19, type: QuestionType.MULTIPLE_CHOICE, questionText: "In link building, 'quality' of a link primarily refers to its:", options: ["Length of the anchor text", "Color and font size", "Authority and relevance", "Position on the page"], correctAnswer: "Authority and relevance" },
  { id: 20, type: QuestionType.MULTIPLE_CHOICE, questionText: "The 'Content Marketing Ecosystem' aims to reach various groups EXCEPT:", options: ["Media and Bloggers", "Customers and Partners", "Competitors' employees", "Influencers"], correctAnswer: "Competitors' employees" },
  { id: 21, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which is an example of 'Earned Media'?", options: ["Your company's Facebook page", "A sponsored post on a blog", "A journalist writing an unsolicited positive review of your product", "An email newsletter to your subscribers"], correctAnswer: "A journalist writing an unsolicited positive review of your product" },
  { id: 22, type: QuestionType.MULTIPLE_CHOICE, questionText: "What does it mean that guest posting quality 'trumps quantity'?", options: ["It's better to post on as many blogs as possible", "One high-quality link is better than many low-quality links", "The longer the guest post, the better", "You should only write one guest post per year"], correctAnswer: "One high-quality link is better than many low-quality links" },
  { id: 23, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is a key component of 'Enhanced Content'?", options: ["It's always text-only", "It's more comprehensive than an average guest post", "It must be published on your own site", "It is always short and easy to read"], correctAnswer: "It's more comprehensive than an average guest post" },
  { id: 24, type: QuestionType.MULTIPLE_CHOICE, questionText: "The primary focus of building an audience should be on:", options: ["Getting the highest possible number of followers", "Building an engaged audience that cares about your content", "Only targeting media and journalists", "Automating all social media posts"], correctAnswer: "Building an engaged audience that cares about your content" },
  { id: 25, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which tactic is a DON'T for obtaining links?", options: ["Sending a press release on a wire service", "Creating a highly relevant widget", "Using comment spam to drop links", "Syndicating your content with attribution"], correctAnswer: "Using comment spam to drop links" },
  { id: 26, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is a major reason why content marketing is crucial for SEO?", options: ["It's the cheapest marketing tactic", "It's the best way to obtain high-quality links naturally", "It guarantees top rankings in one week", "It replaces the need for a good website"], correctAnswer: "It's the best way to obtain high-quality links naturally" },
  { id: 27, type: QuestionType.MULTIPLE_CHOICE, questionText: "A new webpage is typically given a...", options: ["...high initial PageRank.", "...PageRank of zero that never changes.", "...small initial PageRank.", "...PageRank based on its word count."], correctAnswer: "...small initial PageRank." },
  { id: 28, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of these is NOT part of the 'Content Marketing Ecosystem & SEO' diagram?", options: ["Branded & Editorial Content", "Search Engine Optimization", "Social Promotion & Engagement", "Traditional Print Advertising"], correctAnswer: "Traditional Print Advertising" },
  { id: 29, type: QuestionType.MULTIPLE_CHOICE, questionText: "When getting started with audience building, if you have no audience, you should leverage:", options: ["Door-to-door sales", "Other People's Audiences (OPA)", "A large advertising budget", "Search engine penalties"], correctAnswer: "Other People's Audiences (OPA)" },
  { id: 30, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the relationship between Page Relevance and keywords?", options: ["They are unrelated", "A page must be relevant to the keywords it wants to rank for", "The more keywords, the higher the relevance, regardless of content", "Relevance only applies to the homepage"], correctAnswer: "A page must be relevant to the keywords it wants to rank for" },
  { id: 31, type: QuestionType.MULTIPLE_CHOICE, questionText: "What happens to a link's value if it's placed on a page with no topical relevance?", options: ["Its value increases significantly", "Its value is very low", "Its value is unchanged", "It becomes a nofollow link automatically"], correctAnswer: "Its value is very low" },
  { id: 32, type: QuestionType.MULTIPLE_CHOICE, questionText: "The value passed by a link is often called...", options: ["...link dust.", "...link juice.", "...link air.", "...link credit."], correctAnswer: "...link juice." },
  { id: 33, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is a primary risk of avoiding 'guest post spam'?", options: ["Getting a penalty from Google", "Getting too much traffic", "Building too many good links", "Annoying your competitors"], correctAnswer: "Getting a penalty from Google" },
  { id: 34, type: QuestionType.MULTIPLE_CHOICE, questionText: "Publishing a study with original data on your site is a good strategy because:", options: ["It's easy and requires no effort", "It guarantees social media virality", "Media and other sites love to cite and link to data", "It is the only type of content Google ranks"], correctAnswer: "Media and other sites love to cite and link to data" },
  { id: 35, type: QuestionType.MULTIPLE_CHOICE, questionText: "The final step in the 'Content Marketing Ecosystem' workflow shown is:", options: ["Social Promotion", "Relationship Building", "Creating Content", "Measuring ROI"], correctAnswer: "Relationship Building" },
  { id: 36, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which statement best describes the role of influencers?", options: ["They are a distraction from real marketing", "They are an accelerant for content promotion", "They only matter for fashion brands", "They are a replacement for SEO"], correctAnswer: "They are an accelerant for content promotion" },
  { id: 37, type: QuestionType.MULTIPLE_CHOICE, questionText: "A key part of the 'Basics of SEO Recap' is that site structure is...", options: ["...not very important.", "...only important for e-commerce sites.", "...really important for crawling.", "...something you set once and never change."], correctAnswer: "...really important for crawling." },
  { id: 38, type: QuestionType.MULTIPLE_CHOICE, questionText: "Why is it important to avoid being too focused on just 'getting rankings'?", options: ["Rankings don't bring any traffic", "Focusing on promoting the business effectively is a better long-term strategy", "Google changes its algorithm too often", "It's impossible to track rankings"], correctAnswer: "Focusing on promoting the business effectively is a better long-term strategy" },
  { id: 39, type: QuestionType.MULTIPLE_CHOICE, questionText: "The graphic 'Who Ranks First' illustrates that a site with many links generally has...", options: ["...lower rankings.", "...a better design.", "...higher rankings.", "...a physical store."], correctAnswer: "...higher rankings." },
  { id: 40, type: QuestionType.MULTIPLE_CHOICE, questionText: "What does the phrase 'Links Are Not Equal' imply?", options: ["Links from powerful sites are more valuable than links from weak sites", "All links have the exact same value", "You should only get links from new websites", "Links in the footer are the best"], correctAnswer: "Links from powerful sites are more valuable than links from weak sites" },
  { id: 41, type: QuestionType.MULTIPLE_CHOICE, questionText: "To avoid 'guest post spam', you should ensure the link...", options: ["...is bright red and blinking.", "...is the very first word in the article.", "...opens in a new tab.", "...fits the content naturally."], correctAnswer: "...fits the content naturally." },
  { id: 42, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of the following would be 'Enhanced Content'?", options: ["A short tweet", "A 200-word blog comment", "An interactive data visualization", "A company's address"], correctAnswer: "An interactive data visualization" },
  { id: 43, type: QuestionType.MULTIPLE_CHOICE, questionText: "What's the relationship between 'off-site' and 'on-site' content in this ecosystem?", options: ["They are completely separate and should not interact", "They work together to build authority and drive traffic", "Off-site content is always more important", "On-site content is only for existing customers"], correctAnswer: "They work together to build authority and drive traffic" },
  { id: 44, type: QuestionType.MULTIPLE_CHOICE, questionText: "A press release distributed on a wire service is an example of:", options: ["Owned Media", "Earned Media", "Paid Media", "Shared Media"], correctAnswer: "Paid Media" },
  { id: 45, type: QuestionType.MULTIPLE_CHOICE, questionText: "The 'Content Opens Doors' slide suggests that a good content piece helps create:", options: ["A reason to contact influencers and media", "A barrier to entry for competitors", "A legal contract with your audience", "A new product"], correctAnswer: "A reason to contact influencers and media" },
  { id: 46, type: QuestionType.MULTIPLE_CHOICE, questionText: "An iterative algorithm in the context of PageRank means:", options: ["The calculation is only done once", "The calculation is performed repeatedly until the values stabilize", "It's a guess that is usually wrong", "The algorithm is easy to calculate by hand"], correctAnswer: "The calculation is performed repeatedly until the values stabilize" },
  { id: 47, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the most likely outcome of publishing great content online with no promotion?", options: ["It will instantly go viral", "Google will rank it #1 immediately", "Nothing will happen; it will have no audience", "You will get thousands of links overnight"], correctAnswer: "Nothing will happen; it will have no audience" },
  { id: 48, type: QuestionType.MULTIPLE_CHOICE, questionText: "When assessing link value, a metric like Domain Authority is used to estimate a site's overall...", options: ["...age.", "...design quality.", "...strength or authority.", "...number of employees."], correctAnswer: "...strength or authority." },
  { id: 49, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the primary reason content marketing is considered 'expensive'?", options: ["It requires buying expensive software", "Quality content requires significant time, skill, and resources to create", "You have to pay for every link you get", "Google charges a fee for good content"], correctAnswer: "Quality content requires significant time, skill, and resources to create" },
  { id: 50, type: QuestionType.MULTIPLE_CHOICE, questionText: "The overall theme of Session 13 is that content marketing and SEO are:", options: ["Completely separate fields", "Deeply interconnected", "Outdated marketing tactics", "Only for large companies"], correctAnswer: "Deeply interconnected" },

  // Fill in the Blank
  { id: 51, type: QuestionType.FILL_IN_THE_BLANK, questionText: "High-quality links from other sites are a primary way to trigger search engine ______ ______.", correctAnswer: "ranking signals" },
  { id: 52, type: QuestionType.FILL_IN_THE_BLANK, questionText: "When assessing link value, you should place the most weight on ______ ______.", correctAnswer: "Domain Authority" },
  { id: 53, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The concept of using someone else's followers to grow your own is leveraging ______ ______ audiences.", correctAnswer: "other people's" },
  { id: 54, type: QuestionType.FILL_IN_THE_BLANK, questionText: "For guest posting, the two most critical factors for a link's value are high authority and high ______ ______.", correctAnswer: "topical relevance" },
  { id: 55, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The content distribution framework consisting of Paid, Owned, and Earned categories is known as the ______ ______.", correctAnswer: "POEM model" },
  { id: 56, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Content that is significantly more comprehensive than average, such as an interactive tool or video series, is called ______ ______.", correctAnswer: "enhanced content" },
  { id: 57, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The idea of getting links to a blog post which then links to your product page is a strategy called a ______ ______.", correctAnswer: "bank shot" },
  { id: 58, type: QuestionType.FILL_IN_THE_BLANK, questionText: "According to the presentation, when it comes to links, quality trumps ______.", correctAnswer: "quantity" },
  { id: 59, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Leaving irrelevant comments on blogs just to get a link is a spammy practice known as ______ ______.", correctAnswer: "comment spam" },
  { id: 60, type: QuestionType.FILL_IN_THE_BLANK, questionText: "For search engines to find your website's pages, your site needs good crawling and ______.", correctAnswer: "discoverability" },
  { id: 61, type: QuestionType.FILL_IN_THE_BLANK, questionText: "An important principle of audience building is that ______ matters more than just the number of followers.", correctAnswer: "engagement" },
  { id: 62, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The process of getting your content republished on another website is called content ______.", correctAnswer: "syndication" },
  { id: 63, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The value that a link passes to another page is often referred to as ______ ______.", correctAnswer: "link juice" },
  { id: 64, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Media, bloggers, and influencers are all key parts of the content marketing ______.", correctAnswer: "ecosystem" },
  { id: 65, type: QuestionType.FILL_IN_THE_BLANK, questionText: "A link from a high-authority site is better, meaning it has higher ______ ______.", correctAnswer: "Domain Authority" },
];

const session14Questions: Question[] = [
  // Multiple Choice
  { id: 1, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the primary function of Google Analytics?", options: ["To design websites", "To track and report website traffic", "To manage email campaigns", "To create social media ads"], correctAnswer: "To track and report website traffic" },
  { id: 2, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the latest version of Google Analytics called?", options: ["Universal Analytics", "Google Analytics 360", "Google Analytics 4", "Classic Analytics"], correctAnswer: "Google Analytics 4" },
  { id: 3, type: QuestionType.MULTIPLE_CHOICE, questionText: "How does Google Analytics collect data from a website?", options: ["By scanning the website's text", "Through a JavaScript tracking code", "By accessing the web server logs", "From user surveys"], correctAnswer: "Through a JavaScript tracking code" },
  { id: 4, type: QuestionType.MULTIPLE_CHOICE, questionText: "In Google Analytics, what is a 'Metric'?", options: ["An attribute of a user, like their country", "A quantitative measurement, like 'Sessions'", "The title of a report", "A segment of your audience"], correctAnswer: "A quantitative measurement, like 'Sessions'" },
  { id: 5, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of the following is a 'Dimension' in Google Analytics?", options: ["Users", "Conversion Rate", "Traffic Source", "Average Session Duration"], correctAnswer: "Traffic Source" },
  { id: 6, type: QuestionType.MULTIPLE_CHOICE, questionText: "The 'Acquisition' reports in Google Analytics tell you what?", options: ["Who your users are", "How users get to your site", "What users do on your site", "If users are converting"], correctAnswer: "How users get to your site" },
  { id: 7, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which report would you use to find out the most popular pages on your site?", options: ["Audience > Demographics", "Acquisition > All Traffic", "Behavior > Site Content > All Pages", "Conversions > Goals"], correctAnswer: "Behavior > Site Content > All Pages" },
  { id: 8, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is a 'Conversion' in the context of Google Analytics?", options: ["Any visit to the website", "A user who visits more than one page", "A completed activity that is important to your business", "A user who comes from a social media site"], correctAnswer: "A completed activity that is important to your business" },
  { id: 9, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of these would be a good example of a 'Goal' to set up?", options: ["User scrolls down the page", "User visits the homepage", "User submits a 'Contact Us' form", "User stays on site for 10 seconds"], correctAnswer: "User submits a 'Contact Us' form" },
  { id: 10, type: QuestionType.MULTIPLE_CHOICE, questionText: "What does 'Bounce Rate' measure?", options: ["How quickly your website loads", "The percentage of single-page sessions", "The number of users who return to your site", "The average number of pages a user visits"], correctAnswer: "The percentage of single-page sessions" },
  { id: 11, type: QuestionType.MULTIPLE_CHOICE, questionText: "If a user comes to your site by typing your URL directly into their browser, what is the 'Medium'?", options: ["organic", "referral", "cpc", "(none)"], correctAnswer: "(none)" },
  { id: 12, type: QuestionType.MULTIPLE_CHOICE, questionText: "The 'Audience' reports primarily focus on:", options: ["How you acquired users", "The characteristics of your users", "The pages your users visited", "The goals your users completed"], correctAnswer: "The characteristics of your users" },
  { id: 13, type: QuestionType.MULTIPLE_CHOICE, questionText: "The GA4 data model is primarily based on what?", options: ["Sessions and Pageviews", "Events and Parameters", "Users and Hits", "Goals and Funnels"], correctAnswer: "Events and Parameters" },
  { id: 14, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the purpose of tracking conversions?", options: ["To make the website look more popular", "To increase the number of website visitors", "To understand the value and ROI of marketing efforts", "To slow down the website for analysis"], correctAnswer: "To understand the value and ROI of marketing efforts" },
  { id: 15, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which metric represents the total number of visits to your site?", options: ["Users", "Sessions", "Pageviews", "New Users"], correctAnswer: "Sessions" },
  { id: 16, type: QuestionType.MULTIPLE_CHOICE, questionText: "What does the dimension 'Source / Medium' tell you?", options: ["The page a user came from and the type of link", "Where your traffic is from and how it got to you", "The user's location and device", "The browser and operating system used"], correctAnswer: "Where your traffic is from and how it got to you" },
  { id: 17, type: QuestionType.MULTIPLE_CHOICE, questionText: "To see data for traffic from Facebook, you would look at which 'Default Channel Grouping'?", options: ["Organic Search", "Direct", "Referral", "Social"], correctAnswer: "Social" },
  { id: 18, type: QuestionType.MULTIPLE_CHOICE, questionText: "What information can you find in the Behavior > Site Speed reports?", options: ["How many people bought products", "Which pages are loading slowly", "Where your users live", "Which keywords brought traffic"], correctAnswer: "Which pages are loading slowly" },
  { id: 19, type: QuestionType.MULTIPLE_CHOICE, questionText: "The 'Users' metric in Google Analytics counts what?", options: ["The total number of cookies or devices", "The total number of page loads", "The total number of visits", "The total number of clicks"], correctAnswer: "The total number of cookies or devices" },
  { id: 20, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the main difference between a metric and a dimension?", options: ["There is no difference", "Metrics are numbers, dimensions are descriptions", "Metrics are descriptions, dimensions are numbers", "Metrics are for users, dimensions are for sessions"], correctAnswer: "Metrics are numbers, dimensions are descriptions" },
  { id: 21, type: QuestionType.MULTIPLE_CHOICE, questionText: "Setting up goals is crucial for calculating which business metric?", options: ["Employee Satisfaction", "Return on Investment (ROI)", "Website Uptime", "Brand Awareness"], correctAnswer: "Return on Investment (ROI)" },
  { id: 22, type: QuestionType.MULTIPLE_CHOICE, questionText: "The data collected by the tracking code is anonymous. True or False?", options: ["True", "False"], correctAnswer: "True" },
  { id: 23, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of these is NOT one of the 'ABC' core report categories?", options: ["Audience", "Acquisition", "Business", "Behavior"], correctAnswer: "Business" },
  { id: 24, type: QuestionType.MULTIPLE_CHOICE, questionText: "If you want to know what devices people use to browse your site, where would you look?", options: ["Acquisition > Source/Medium", "Behavior > Site Content", "Audience > Mobile > Devices", "Conversions > Goals"], correctAnswer: "Audience > Mobile > Devices" },
  { id: 25, type: QuestionType.MULTIPLE_CHOICE, questionText: "The 'Landing Pages' report shows you:", options: ["The last page a user viewed before leaving", "The first page a user viewed in their session", "All pages viewed by a user", "The page where a user converted"], correctAnswer: "The first page a user viewed in their session" },
  { id: 26, type: QuestionType.MULTIPLE_CHOICE, questionText: "What does 'Direct' traffic refer to?", options: ["Traffic from search engines", "Traffic from other websites", "Traffic from users who typed the URL directly", "Traffic from social media"], correctAnswer: "Traffic from users who typed the URL directly" },
  { id: 27, type: QuestionType.MULTIPLE_CHOICE, questionText: "To analyze the performance of your Google Ads campaigns in GA, you should link your Google Ads and Analytics accounts. True or False?", options: ["True", "False"], correctAnswer: "True" },
  { id: 28, type: QuestionType.MULTIPLE_CHOICE, questionText: "What does 'Pageviews' measure?", options: ["The number of unique visitors", "The total number of pages viewed", "The number of sessions", "The number of users"], correctAnswer: "The total number of pages viewed" },
  { id: 29, type: QuestionType.MULTIPLE_CHOICE, questionText: "The 'Conversion Rate' is calculated as:", options: ["(Sessions / Conversions) * 100", "(Users / Sessions) * 100", "(Conversions / Sessions) * 100", "(Pageviews / Conversions) * 100"], correctAnswer: "(Conversions / Sessions) * 100" },
  { id: 30, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which is a valid example of a Dimension/Metric combination?", options: ["Country / Bounce Rate", "Sessions / Pageviews", "Users / New Users", "Bounce Rate / Conversion Rate"], correctAnswer: "Country / Bounce Rate" },
  { id: 31, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is a 'Session' in Google Analytics?", options: ["A single page view", "A group of user interactions within a given time frame", "One unique user", "A completed goal"], correctAnswer: "A group of user interactions within a given time frame" },
  { id: 32, type: QuestionType.MULTIPLE_CHOICE, questionText: "By default, a session ends after how much inactivity?", options: ["10 minutes", "30 minutes", "60 minutes", "24 hours"], correctAnswer: "30 minutes" },
  { id: 33, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is 'Referral' traffic?", options: ["Traffic from Google search", "Traffic from a link on another website", "Traffic from an email campaign", "Traffic from a paid ad"], correctAnswer: "Traffic from a link on another website" },
  { id: 34, type: QuestionType.MULTIPLE_CHOICE, questionText: "The Demographics reports in Google Analytics provide information about user...", options: ["...page views and clicks", "...age and gender", "...purchase history", "...browser and device"], correctAnswer: "...age and gender" },
  { id: 35, type: QuestionType.MULTIPLE_CHOICE, questionText: "To track newsletter sign-ups as a conversion, you would typically set up a goal based on:", options: ["Visiting the homepage", "Visiting the 'Thank You' page after signing up", "Staying on the site for 5 minutes", "Clicking any button"], correctAnswer: "Visiting the 'Thank You' page after signing up" },
  { id: 36, type: QuestionType.MULTIPLE_CHOICE, questionText: "What does the 'Medium' 'organic' refer to?", options: ["Paid search traffic", "Traffic from social media", "Unpaid search traffic from search engines", "Traffic from email links"], correctAnswer: "Unpaid search traffic from search engines" },
  { id: 37, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the primary benefit of using Google Analytics?", options: ["It guarantees first page ranking on Google", "It automatically fixes website errors", "It provides insights to make data-driven decisions", "It creates content for your blog"], correctAnswer: "It provides insights to make data-driven decisions" },
  { id: 38, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which report shows you the path users take through your website?", options: ["Behavior Flow", "Source/Medium", "Landing Pages", "Demographics"], correctAnswer: "Behavior Flow" },
  { id: 39, type: QuestionType.MULTIPLE_CHOICE, questionText: "Can Google Analytics track users across different devices (e.g., phone and desktop)?", options: ["No, it's impossible", "Yes, automatically without any setup", "Yes, if the User-ID feature is implemented", "Only if they use the same browser"], correctAnswer: "Yes, if the User-ID feature is implemented" },
  { id: 40, type: QuestionType.MULTIPLE_CHOICE, questionText: "What are 'UTM parameters' used for?", options: ["To speed up a website", "To track the performance of specific marketing campaigns", "To change the website's design", "To block unwanted traffic"], correctAnswer: "To track the performance of specific marketing campaigns" },
  { id: 41, type: QuestionType.MULTIPLE_CHOICE, questionText: "The 'Real-Time' reports show you:", options: ["What happened on your site yesterday", "What is happening on your site right now", "What is predicted to happen tomorrow", "A summary of the last month's activity"], correctAnswer: "What is happening on your site right now" },
  { id: 42, type: QuestionType.MULTIPLE_CHOICE, questionText: "In GA4, a 'pageview' is tracked as a specific type of what?", options: ["User", "Session", "Event", "Goal"], correctAnswer: "Event" },
  { id: 43, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the main advantage of the GA4 event-based model over the session-based model?", options: ["It's simpler to understand", "It offers more flexibility in tracking user interactions", "It only works on mobile apps", "It collects less data"], correctAnswer: "It offers more flexibility in tracking user interactions" },
  { id: 44, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of the following can you NOT learn from the Geo > Location report?", options: ["The countries your users are from", "The cities your users are from", "The languages your users' browsers are set to", "The specific home addresses of your users"], correctAnswer: "The specific home addresses of your users" },
  { id: 45, type: QuestionType.MULTIPLE_CHOICE, questionText: "What does a 0% bounce rate on a page likely indicate?", options: ["The page is extremely engaging", "No one is visiting the page", "There is an issue with the tracking code installation", "The page is loading very fast"], correctAnswer: "There is an issue with the tracking code installation" },
  { id: 46, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which traffic source is typically the most valuable for long-term, sustainable growth?", options: ["Paid Search", "Social", "Organic Search", "Direct"], correctAnswer: "Organic Search" },
  { id: 47, type: QuestionType.MULTIPLE_CHOICE, questionText: "To compare the behavior of users from mobile vs. desktop, you would use a:", options: ["Filter", "Goal", "Segment", "Metric"], correctAnswer: "Segment" },
  { id: 48, type: QuestionType.MULTIPLE_CHOICE, questionText: "The 'Exit Page' report shows you:", options: ["The first page users see", "The most popular pages", "The last page users view before leaving your site", "The pages with the highest conversion rate"], correctAnswer: "The last page users view before leaving your site" },
  { id: 49, type: QuestionType.MULTIPLE_CHOICE, questionText: "Is Google Analytics a free service?", options: ["Yes, the standard version is free", "No, it always requires a monthly subscription", "It's only free for non-profit organizations", "It's only free for the first month"], correctAnswer: "Yes, the standard version is free" },
  { id: 50, type: QuestionType.MULTIPLE_CHOICE, questionText: "A 'hit' in Google Analytics can be which of the following?", options: ["A pageview", "An event", "A transaction", "All of the above"], correctAnswer: "All of the above" },

  // Fill in the Blank
  { id: 51, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The small piece of JavaScript that collects data on your site is called the ______ ______.", correctAnswer: "tracking code" },
  { id: 52, type: QuestionType.FILL_IN_THE_BLANK, questionText: "In reports, quantitative numbers are called metrics, while descriptive attributes are called ______.", correctAnswer: "dimensions" },
  { id: 53, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The percentage of visits where the user only viewed one page is known as the ______ ______.", correctAnswer: "bounce rate" },
  { id: 54, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The Acquisition, Behavior, and Conversions reports are often called the ______ of analytics.", correctAnswer: "ABCs" },
  { id: 55, type: QuestionType.FILL_IN_THE_BLANK, questionText: "A completed activity that is valuable to your business is tracked as a ______.", correctAnswer: "conversion" },
  { id: 56, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Traffic that comes from unpaid Google search results has a medium of ______.", correctAnswer: "organic" },
  { id: 57, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The latest version of the platform, GA4, uses an ______-______ data model.", correctAnswer: "event based" },
  { id: 58, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The report that shows you the first page a user lands on is the ______ ______ report.", correctAnswer: "landing pages" },
  { id: 59, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Traffic from users who type your website address directly into their browser is categorized as ______ traffic.", correctAnswer: "direct" },
  { id: 60, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The 'Audience' reports tell you ______ your users are.", correctAnswer: "who" },
  { id: 61, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The metric for a single visit to your website is called a ______.", correctAnswer: "session" },
  { id: 62, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The combination of where traffic came from and how it got there is shown in the ______ / ______ dimension.", correctAnswer: "source medium" },
  { id: 63, type: QuestionType.FILL_IN_THE_BLANK, questionText: "To see what is happening on your website this very moment, you would use the ______-______ reports.", correctAnswer: "real time" },
  { id: 64, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The total number of pages viewed on your site is measured by the ______ metric.", correctAnswer: "pageviews" },
  { id: 65, type: QuestionType.FILL_IN_THE_BLANK, questionText: "A link from another website is considered ______ traffic.", correctAnswer: "referral" },
];

const session15Questions: Question[] = [
  // Multiple Choice
  { id: 1, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the primary purpose of a robots.txt file?", options: ["To map out all pages on a site", "To give instructions to search engine crawlers", "To secure a website with HTTPS", "To speed up page loading times"], correctAnswer: "To give instructions to search engine crawlers" },
  { id: 2, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of the following is a key component of Technical SEO?", options: ["Writing blog posts", "Creating social media profiles", "Optimizing for site speed", "Designing a logo"], correctAnswer: "Optimizing for site speed" },
  { id: 3, type: QuestionType.MULTIPLE_CHOICE, questionText: "'Mobile-First Indexing' means Google primarily uses which version of your site for ranking?", options: ["The desktop version", "The mobile version", "The tablet version", "The version with the most content"], correctAnswer: "The mobile version" },
  { id: 4, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is an XML Sitemap?", options: ["A file that blocks search engines", "A page for users to see the site structure", "A list of URLs on your site for search engines to crawl", "A security certificate for your website"], correctAnswer: "A list of URLs on your site for search engines to crawl" },
  { id: 5, type: QuestionType.MULTIPLE_CHOICE, questionText: "Schema markup can help create what in search results?", options: ["More backlinks", "Higher domain authority", "Rich Snippets", "Faster page speed"], correctAnswer: "Rich Snippets" },
  { id: 6, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of these is an example of a Rich Snippet?", options: ["A blue link title", "A green URL", "Star ratings below a product listing", "The 'cached' link"], correctAnswer: "Star ratings below a product listing" },
  { id: 7, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the recommended format for implementing structured data, according to Google?", options: ["Microdata", "JSON-LD", "RDFa", "HTML"], correctAnswer: "JSON-LD" },
  { id: 8, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which HTML tag is most important for on-page SEO and appears as the headline in search results?", options: ["<h1> tag", "<meta description>", "<title> tag", "<img> tag"], correctAnswer: "<title> tag" },
  { id: 9, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the main purpose of using header tags (H1, H2, H3)?", options: ["To make text bold", "To hide content from users", "To create a logical structure for content", "To add more keywords to a page"], correctAnswer: "To create a logical structure for content" },
  { id: 10, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is Local SEO primarily concerned with?", options: ["Ranking in different countries", "Optimizing for searches in a specific geographic area", "Translating a website into multiple languages", "Selling products internationally"], correctAnswer: "Optimizing for searches in a specific geographic area" },
  { id: 11, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the cornerstone of a successful Local SEO strategy?", options: ["A blog", "A large social media following", "An optimized Google Business Profile", "A high advertising budget"], correctAnswer: "An optimized Google Business Profile" },
  { id: 12, type: QuestionType.MULTIPLE_CHOICE, questionText: "What does 'NAP Consistency' refer to in Local SEO?", options: ["Not Annoying People", "Natural Anchor Protocol", "Consistency of Name, Address, and Phone number", "New Article Publishing"], correctAnswer: "Consistency of Name, Address, and Phone number" },
  { id: 13, type: QuestionType.MULTIPLE_CHOICE, questionText: "How should you optimize for voice search?", options: ["By using short, one-word keywords", "By creating content that answers conversational questions", "By removing all images from your site", "By using only H1 tags"], correctAnswer: "By creating content that answers conversational questions" },
  { id: 14, type: QuestionType.MULTIPLE_CHOICE, questionText: "What search result feature is particularly important for winning voice search queries?", options: ["Image Packs", "Video Carousels", "Featured Snippets (Position Zero)", "Shopping Ads"], correctAnswer: "Featured Snippets (Position Zero)" },
  { id: 15, type: QuestionType.MULTIPLE_CHOICE, questionText: "The practice of strategically linking to other pages on your own website is called:", options: ["Backlinking", "Outbound linking", "Internal linking", "Deep linking"], correctAnswer: "Internal linking" },
  { id: 16, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the purpose of ALT text for an image?", options: ["To provide a caption visible to users", "To describe the image for visually impaired users and search engines", "To hide the image from search engines", "To link the image to another page"], correctAnswer: "To describe the image for visually impaired users and search engines" },
  { id: 17, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of the following is a positive ranking factor?", options: ["A slow website", "A non-secure (HTTP) website", "A mobile-friendly website", "A website with no internal links"], correctAnswer: "A mobile-friendly website" },
  { id: 18, type: QuestionType.MULTIPLE_CHOICE, questionText: "The meta description tag's primary SEO function is to:", options: ["Directly impact rankings", "Increase click-through rate (CTR) from search results", "Tell Google which keywords to rank for", "Store private data about the page"], correctAnswer: "Increase click-through rate (CTR) from search results" },
  { id: 19, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which tool can you use to submit your XML sitemap to Google?", options: ["Google Analytics", "Google Search Console", "Google Ads", "Google Business Profile"], correctAnswer: "Google Search Console" },
  { id: 20, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is a 'local citation'?", options: ["A review from a local customer", "A link from a local news website", "A mention of your business's NAP on another website", "A check-in on social media"], correctAnswer: "A mention of your business's NAP on another website" },
  { id: 21, type: QuestionType.MULTIPLE_CHOICE, questionText: "A 301 redirect is used to:", options: ["Permanently move a URL to a new location", "Temporarily move a URL", "Indicate a page is not found (404 error)", "Block a page from being crawled"], correctAnswer: "Permanently move a URL to a new location" },
  { id: 22, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which factor is NOT a primary component of site speed?", options: ["Image size", "Server response time", "Number of H1 tags", "Browser caching"], correctAnswer: "Number of H1 tags" },
  { id: 23, type: QuestionType.MULTIPLE_CHOICE, questionText: "Why is internal linking important for SEO?", options: ["It helps distribute PageRank and establish site architecture", "It is the only way to get backlinks", "It guarantees rich snippets", "It increases your number of followers"], correctAnswer: "It helps distribute PageRank and establish site architecture" },
  { id: 24, type: QuestionType.MULTIPLE_CHOICE, questionText: "A canonical tag (rel=\"canonical\") is used to:", options: ["Tell Google to rank a specific page", "Specify the preferred version of a page with duplicate content", "Translate a page into another language", "Noindex a page"], correctAnswer: "Specify the preferred version of a page with duplicate content" },
  { id: 25, type: QuestionType.MULTIPLE_CHOICE, questionText: "What type of keyword is 'best Italian restaurant in San Francisco'?", options: ["Short-tail keyword", "Broad keyword", "Long-tail keyword", "Negative keyword"], correctAnswer: "Long-tail keyword" },
  { id: 26, type: QuestionType.MULTIPLE_CHOICE, questionText: "The title tag should ideally be:", options: ["Over 100 characters long", "The same on every page", "Unique for each page and under 60 characters", "Filled with as many keywords as possible"], correctAnswer: "Unique for each page and under 60 characters" },
  { id: 27, type: QuestionType.MULTIPLE_CHOICE, questionText: "What does HTTPS stand for?", options: ["HyperText Transfer Protocol Secure", "High-Traffic Text Page Server", "HyperText Total Page Security", "Home Text Page System"], correctAnswer: "HyperText Transfer Protocol Secure" },
  { id: 28, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of the following is a key ranking factor for Local SEO?", options: ["Number of international backlinks", "Proximity of the business to the searcher", "Age of the domain", "Number of ad campaigns running"], correctAnswer: "Proximity of the business to the searcher" },
  { id: 29, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is 'keyword cannibalization'?", options: ["When a competitor outranks you for your keyword", "When multiple pages on your own site compete for the same keyword", "When you use too many keywords on one page", "When you use a keyword that is no longer popular"], correctAnswer: "When multiple pages on your own site compete for the same keyword" },
  { id: 30, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of these is an example of structured data?", options: ["Recipe schema with cooking time and ingredients", "A blog post about cooking", "An image of a finished dish", "A list of ingredients in a bulleted list"], correctAnswer: "Recipe schema with cooking time and ingredients" },
  { id: 31, type: QuestionType.MULTIPLE_CHOICE, questionText: "A 404 error indicates that a page is:", options: ["Working perfectly", "Permanently moved", "Temporarily unavailable", "Not found"], correctAnswer: "Not found" },
  { id: 32, type: QuestionType.MULTIPLE_CHOICE, questionText: "The practice of improving a site's performance for users on smartphones and tablets is called:", options: ["Desktop optimization", "Cross-browser compatibility", "Mobile optimization", "Server-side rendering"], correctAnswer: "Mobile optimization" },
  { id: 33, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is a major benefit of having a fast-loading website?", options: ["Improved user experience and potentially higher rankings", "It uses more server resources", "It forces users to stay longer", "It prevents Google from crawling the site"], correctAnswer: "Improved user experience and potentially higher rankings" },
  { id: 34, type: QuestionType.MULTIPLE_CHOICE, questionText: "The file that tells search engines which pages they should NOT crawl is:", options: ["sitemap.xml", "index.html", "robots.txt", "style.css"], correctAnswer: "robots.txt" },
  { id: 35, type: QuestionType.MULTIPLE_CHOICE, questionText: "Voice search queries tend to be more...", options: ["...short and abbreviated.", "...technical and complex.", "...navigational.", "...conversational and natural."], correctAnswer: "...conversational and natural." },
  { id: 36, type: QuestionType.MULTIPLE_CHOICE, questionText: "In Local SEO, customer reviews on Google Business Profile are considered:", options: ["Irrelevant for rankings", "A significant ranking factor", "Only important for the business owner", "A negative factor if they are too positive"], correctAnswer: "A significant ranking factor" },
  { id: 37, type: QuestionType.MULTIPLE_CHOICE, questionText: "The 'hreflang' attribute is used for:", options: ["Styling text on a page", "Indicating the language and regional targeting of a page", "Creating an internal link", "Defining a header"], correctAnswer: "Indicating the language and regional targeting of a page" },
  { id: 38, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which is NOT a type of schema markup?", options: ["Product schema", "Review schema", "Article schema", "Backlink schema"], correctAnswer: "Backlink schema" },
  { id: 39, type: QuestionType.MULTIPLE_CHOICE, questionText: "Optimizing a page's URL structure involves:", options: ["Making it long and detailed", "Including special characters like '&' and '?'", "Making it short, descriptive, and including a keyword", "Using a random string of numbers"], correctAnswer: "Making it short, descriptive, and including a keyword" },
  { id: 40, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the 'crawl budget'?", options: ["The amount of money you pay Google to crawl your site", "The number of pages Googlebot crawls on a site within a certain timeframe", "A list of pages you want Google to crawl", "The time it takes for a page to load"], correctAnswer: "The number of pages Googlebot crawls on a site within a certain timeframe" },
  { id: 41, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which on-page element should contain the primary keyword and be unique for each page?", options: ["Footer", "Navigation menu", "H1 Tag", "Logo"], correctAnswer: "H1 Tag" },
  { id: 42, type: QuestionType.MULTIPLE_CHOICE, questionText: "A 'noindex' tag in the meta robots tag tells search engines to:", options: ["Index the page immediately", "Not show the page in search results", "Follow all links on the page", "Prioritize this page over others"], correctAnswer: "Not show the page in search results" },
  { id: 43, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of these is a Technical SEO issue?", options: ["Low quality content", "Not enough backlinks", "Duplicate content issues", "Poor social media presence"], correctAnswer: "Duplicate content issues" },
  { id: 44, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the primary benefit of earning a Featured Snippet?", options: ["It provides a valuable backlink", "It increases visibility and can capture voice search answers", "It guarantees a #1 ranking for all keywords", "It automatically improves site speed"], correctAnswer: "It increases visibility and can capture voice search answers" },
  { id: 45, type: QuestionType.MULTIPLE_CHOICE, questionText: "An 'unnatural link' penalty from Google is most likely caused by:", options: ["Earning a link from a news site", "Participating in link schemes or buying links", "Getting a link from a relevant blog", "Internal linking too much"], correctAnswer: "Participating in link schemes or buying links" },
  { id: 46, type: QuestionType.MULTIPLE_CHOICE, questionText: "The practice of making sure a website is easy to use on all devices is called:", options: ["Responsive design", "Static design", "Fluid design", "Adaptive design"], correctAnswer: "Responsive design" },
  { id: 47, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the first step in performing an SEO audit?", options: ["Building backlinks", "Writing new content", "Crawling the website to identify technical issues", "Running a paid ad campaign"], correctAnswer: "Crawling the website to identify technical issues" },
  { id: 48, type: QuestionType.MULTIPLE_CHOICE, questionText: "A page's URL is considered an on-page SEO factor. True or False?", options: ["True", "False"], correctAnswer: "True" },
  { id: 49, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is a 'disavow' file used for?", options: ["To tell Google which links to your site you don't trust", "To claim ownership of your website", "To submit a new sitemap", "To block competitors from linking to you"], correctAnswer: "To tell Google which links to your site you don't trust" },
  { id: 50, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of the following would be the best H1 tag for a page about 'blue widgets'?", options: ["Home", "Products", "Everything You Need to Know About Our High-Quality Blue Widgets", "Click Here"], correctAnswer: "Everything You Need to Know About Our High-Quality Blue Widgets" },

  // Fill in the Blank
  { id: 51, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The practice of ensuring a site can be effectively crawled and indexed is called ______ ______.", correctAnswer: "technical SEO" },
  { id: 52, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Code added to a page to help search engines understand content and create rich snippets is called ______ ______.", correctAnswer: "schema markup" },
  { id: 53, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Google's policy of primarily using the mobile version of a site for ranking is called ______-______ indexing.", correctAnswer: "mobile first" },
  { id: 54, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The cornerstone of local SEO is an optimized ______ ______ Profile.", correctAnswer: "google business" },
  { id: 55, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The file that provides a roadmap of your website for search engines is the XML ______.", correctAnswer: "sitemap" },
  { id: 56, type: QuestionType.FILL_IN_THE_BLANK, questionText: "A permanent redirect that passes most link equity is a ______ redirect.", correctAnswer: "301" },
  { id: 57, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Optimizing content to answer conversational queries is key for ______ ______ optimization.", correctAnswer: "voice search" },
  { id: 58, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The HTML tag that defines the title of a page in browser tabs and search results is the ______ ______.", correctAnswer: "title tag" },
  { id: 59, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Making sure your Name, Address, and Phone number are consistent across the web is called ______ ______.", correctAnswer: "NAP consistency" },
  { id: 60, type: QuestionType.FILL_IN_THE_BLANK, questionText: "A text description of an image for search engines and screen readers is called ______ ______.", correctAnswer: "alt text" },
  { id: 61, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Strategically linking to other pages on your own website is known as ______ ______.", correctAnswer: "internal linking" },
  { id: 62, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Extra information like ratings and prices in search results are called ______ ______.", correctAnswer: "rich snippets" },
  { id: 63, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The file that instructs search engine crawlers on what they can and cannot crawl is ______.", correctAnswer: "robots.txt" },
  { id: 64, type: QuestionType.FILL_IN_THE_BLANK, questionText: "How fast your webpages load for users is a ranking factor known as ______ ______.", correctAnswer: "site speed" },
  { id: 65, type: QuestionType.FILL_IN_THE_BLANK, questionText: "A '404 error' signifies that a page was ______ ______.", correctAnswer: "not found" },
];

const session16Questions: Question[] = [
  // Multiple Choice
  { id: 1, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the correct hierarchy for a Google Ads account?", options: ["Campaign > Account > Ad Group", "Account > Ad Group > Campaign", "Account > Campaign > Ad Group", "Ad Group > Campaign > Account"], correctAnswer: "Account > Campaign > Ad Group" },
  { id: 2, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which keyword match type provides the most control over who sees your ad?", options: ["Broad Match", "Phrase Match", "Exact Match", "Broad Match Modifier"], correctAnswer: "Exact Match" },
  { id: 3, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the formula for Ad Rank?", options: ["Quality Score + Max CPC Bid", "Max CPC Bid / Quality Score", "Max CPC Bid × Quality Score", "Quality Score - Max CPC Bid"], correctAnswer: "Max CPC Bid × Quality Score" },
  { id: 4, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which of the following is NOT a component of Quality Score?", options: ["Expected click-through rate", "Ad relevance", "Landing page experience", "Campaign budget"], correctAnswer: "Campaign budget" },
  { id: 5, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the primary purpose of Ad Extensions?", options: ["To decrease your CPC", "To provide additional information and increase CTR", "To guarantee the top ad position", "To automatically translate your ads"], correctAnswer: "To provide additional information and increase CTR" },
  { id: 6, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which bidding strategy would you use if your goal is to get as many website visits as possible within your budget?", options: ["Target CPA", "Target ROAS", "Maximize Clicks", "Manual CPC"], correctAnswer: "Maximize Clicks" },
  { id: 7, type: QuestionType.MULTIPLE_CHOICE, questionText: "An Ad Group should contain:", options: ["A large number of unrelated keywords", "A small, tightly-themed set of keywords", "Only one keyword", "All keywords for the entire campaign"], correctAnswer: "A small, tightly-themed set of keywords" },
  { id: 8, type: QuestionType.MULTIPLE_CHOICE, questionText: "What does CPA stand for?", options: ["Cost Per Audience", "Cost Per Acquisition", "Cost Per Ad", "Cost Per Approval"], correctAnswer: "Cost Per Acquisition" },
  { id: 9, type: QuestionType.MULTIPLE_CHOICE, questionText: "Using the keyword [men's running shoes] will show your ad for which search query?", options: ["running sneakers for men", "men's running shoes", "best shoes for running", "men's boots"], correctAnswer: "men's running shoes" },
  { id: 10, type: QuestionType.MULTIPLE_CHOICE, questionText: "A high Quality Score can lead to:", options: ["A higher cost per click and lower ad position", "A lower cost per click and higher ad position", "Your ads being disapproved", "A penalty from Google"], correctAnswer: "A lower cost per click and higher ad position" },
  { id: 11, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which setting is controlled at the Campaign level?", options: ["Keywords", "Ad copy text", "Budget and location targeting", "Final URL"], correctAnswer: "Budget and location targeting" },
  { id: 12, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which match type would allow your ad for \"tennis shoes\" to show for a search like 'buy tennis sneakers'?", options: ["Exact Match", "Phrase Match", "Broad Match", "Negative Match"], correctAnswer: "Phrase Match" },
  { id: 13, type: QuestionType.MULTIPLE_CHOICE, questionText: "What type of Ad Extension would be best for showcasing specific pages of your website, like 'About Us' or 'Contact'?", options: ["Callout Extension", "Sitelink Extension", "Location Extension", "Price Extension"], correctAnswer: "Sitelink Extension" },
  { id: 14, type: QuestionType.MULTIPLE_CHOICE, questionText: "The Google Search Network shows ads on:", options: ["YouTube videos", "Google search results pages and search partners", "Mobile apps and websites", "Gmail inboxes"], correctAnswer: "Google search results pages and search partners" },
  { id: 15, type: QuestionType.MULTIPLE_CHOICE, questionText: "If your goal is to achieve a specific return on your advertising investment, which bidding strategy is most appropriate?", options: ["Maximize Clicks", "Target Impression Share", "Target ROAS", "Manual CPC"], correctAnswer: "Target ROAS" },
  { id: 16, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is a 'negative keyword'?", options: ["A keyword with a low search volume", "A keyword that prevents your ad from showing for certain search terms", "A keyword that has a low Quality Score", "A keyword that is misspelled"], correctAnswer: "A keyword that prevents your ad from showing for certain search terms" },
  { id: 17, type: QuestionType.MULTIPLE_CHOICE, questionText: "The 'Landing Page Experience' component of Quality Score evaluates:", options: ["How many images are on your landing page", "The relevance and usability of your landing page", "The domain authority of your website", "The number of backlinks to your landing page"], correctAnswer: "The relevance and usability of your landing page" },
  { id: 18, type: QuestionType.MULTIPLE_CHOICE, questionText: "Callout Extensions are best used to:", options: ["Show your business address", "Provide a phone number for customers to call", "Highlight key benefits and features like 'Free Shipping'", "Link to specific product categories"], correctAnswer: "Highlight key benefits and features like 'Free Shipping'" },
  { id: 19, type: QuestionType.MULTIPLE_CHOICE, questionText: "What does CTR stand for?", options: ["Cost Through Rate", "Click Track Ratio", "Click-Through Rate", "Conversion Tracking Rate"], correctAnswer: "Click-Through Rate" },
  { id: 20, type: QuestionType.MULTIPLE_CHOICE, questionText: "In Google Ads, you primarily pay when:", options: ["Someone sees your ad (impression)", "Someone clicks your ad (click)", "Someone makes a purchase (conversion)", "Your campaign is approved"], correctAnswer: "Someone clicks your ad (click)" },
  { id: 21, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which keyword match type is the most restrictive?", options: ["Broad Match", "Phrase Match", "Exact Match"], correctAnswer: "Exact Match" },
  { id: 22, type: QuestionType.MULTIPLE_CHOICE, questionText: "The main benefit of a well-structured account is:", options: ["It looks organized and is easier to manage", "It improves relevance, Quality Score, and performance", "It allows you to use more keywords", "It is required by Google's terms of service"], correctAnswer: "It improves relevance, Quality Score, and performance" },
  { id: 23, type: QuestionType.MULTIPLE_CHOICE, questionText: "Manual CPC bidding gives you:", options: ["The least control over your bids", "Full control to set the maximum amount you'll pay per click", "Bids set automatically by Google", "A guaranteed number of conversions"], correctAnswer: "Full control to set the maximum amount you'll pay per click" },
  { id: 24, type: QuestionType.MULTIPLE_CHOICE, questionText: "To show your business address in your ad, you should use a:", options: ["Sitelink Extension", "Call Extension", "Location Extension", "App Extension"], correctAnswer: "Location Extension" },
  { id: 25, type: QuestionType.MULTIPLE_CHOICE, questionText: "If you sell shoes, adding '-free' as a negative keyword would prevent your ad from showing for searches like:", options: ["'running shoes'", "'best shoes for free'", "'size 10 shoes'", "'red shoes'"], correctAnswer: "'best shoes for free'" },
  { id: 26, type: QuestionType.MULTIPLE_CHOICE, questionText: "The Google Display Network primarily shows what type of ads?", options: ["Text ads on search results pages", "Video ads on YouTube", "Image and banner ads on websites and apps", "Shopping ads with product images"], correctAnswer: "Image and banner ads on websites and apps" },
  { id: 27, type: QuestionType.MULTIPLE_CHOICE, questionText: "An ad's relevance is a measure of:", options: ["How well the ad matches the user's search query", "How colorful the ad is", "How much the ad costs", "How old the ad is"], correctAnswer: "How well the ad matches the user's search query" },
  { id: 28, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the maximum number of headlines you can create for a Responsive Search Ad?", options: ["3", "5", "10", "15"], correctAnswer: "15" },
  { id: 29, type: QuestionType.MULTIPLE_CHOICE, questionText: "Improving your Quality Score from 3 to 8 could...", options: ["...significantly increase your CPC.", "...have no effect on your costs.", "...significantly decrease your CPC.", "...get your account suspended."], correctAnswer: "...significantly decrease your CPC." },
  { id: 30, type: QuestionType.MULTIPLE_CHOICE, questionText: "The 'Target CPA' bidding strategy is designed to:", options: ["Get the most clicks for your budget", "Get the most conversions at a specific cost per conversion you set", "Show your ad at the top of the page", "Maximize your return on ad spend"], correctAnswer: "Get the most conversions at a specific cost per conversion you set" },
  { id: 31, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which component of the account structure contains the ads and keywords?", options: ["Account", "Campaign", "Ad Group", "Billing"], correctAnswer: "Ad Group" },
  { id: 32, type: QuestionType.MULTIPLE_CHOICE, questionText: "Broad match is the best option for advertisers who want:", options: ["Precise control over their targeting", "To reach the widest possible audience", "The lowest possible cost per click", "To only show for very specific searches"], correctAnswer: "To reach the widest possible audience" },
  { id: 33, type: QuestionType.MULTIPLE_CHOICE, questionText: "Ad Extensions cost extra to add to your campaign. True or False?", options: ["True", "False"], correctAnswer: "False" },
  { id: 34, type: QuestionType.MULTIPLE_CHOICE, questionText: "Your ad's position is determined by:", options: ["Your budget alone", "Your Quality Score alone", "Your Ad Rank", "How long you have been an advertiser"], correctAnswer: "Your Ad Rank" },
  { id: 35, type: QuestionType.MULTIPLE_CHOICE, questionText: "Why is it important for an ad to be relevant to its landing page?", options: ["It's not important", "It's a key factor for a good landing page experience and Quality Score", "It's only important for display ads", "It helps the page load faster"], correctAnswer: "It's a key factor for a good landing page experience and Quality Score" },
  { id: 36, type: QuestionType.MULTIPLE_CHOICE, questionText: "Structured Snippets are used to highlight:", options: ["A specific promotion or sale", "Aspects of a product or service category (e.g., 'Brands: Nike, Adidas')", "Your business's phone number", "Customer reviews"], correctAnswer: "Aspects of a product or service category (e.g., 'Brands: Nike, Adidas')" },
  { id: 37, type: QuestionType.MULTIPLE_CHOICE, questionText: "If you bid $2.00 and your Quality Score is 10, what is your Ad Rank?", options: ["5", "12", "20", "100"], correctAnswer: "20" },
  { id: 38, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which is an example of a setting you would manage at the campaign level?", options: ["Writing ad headlines", "Choosing keywords", "Setting a daily budget", "Creating a sitelink extension"], correctAnswer: "Setting a daily budget" },
  { id: 39, type: QuestionType.MULTIPLE_CHOICE, questionText: "The main purpose of creating different Ad Groups is to:", options: ["Increase your daily budget", "Improve relevance between keywords, ads, and landing pages", "Target different countries with each group", "Test different bidding strategies"], correctAnswer: "Improve relevance between keywords, ads, and landing pages" },
  { id: 40, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which keyword match type is symbolized by quotation marks, like \"running shoes\"?", options: ["Broad Match", "Phrase Match", "Exact Match", "Negative Match"], correctAnswer: "Phrase Match" },
  { id: 41, type: QuestionType.MULTIPLE_CHOICE, questionText: "A 'conversion' in Google Ads could be:", options: ["A user clicking on an ad", "An ad being shown to a user", "A user making a purchase or filling out a form", "A user visiting the homepage"], correctAnswer: "A user making a purchase or filling out a form" },
  { id: 42, type: QuestionType.MULTIPLE_CHOICE, questionText: "Automated bidding strategies use machine learning to:", options: ["Write your ad copy for you", "Optimize your bids in real-time to meet your goals", "Design your landing page", "Choose your campaign budget"], correctAnswer: "Optimize your bids in real-time to meet your goals" },
  { id: 43, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the primary risk of using only Broad Match keywords?", options: ["You won't get enough traffic", "You might pay for irrelevant clicks that don't convert", "Your Quality Score will be too high", "Your ads will be disapproved"], correctAnswer: "You might pay for irrelevant clicks that don't convert" },
  { id: 44, type: QuestionType.MULTIPLE_CHOICE, questionText: "The number of times your ad is shown is called:", options: ["Clicks", "CTR", "Impressions", "Conversions"], correctAnswer: "Impressions" },
  { id: 45, type: QuestionType.MULTIPLE_CHOICE, questionText: "Which Ad Extension is best for a local plumber who wants customers to call them directly?", options: ["Sitelink Extension", "Price Extension", "Promotion Extension", "Call Extension"], correctAnswer: "Call Extension" },
  { id: 46, type: QuestionType.MULTIPLE_CHOICE, questionText: "If Advertiser A has an Ad Rank of 24 and Advertiser B has an Ad Rank of 20, who gets the higher position?", options: ["Advertiser A", "Advertiser B", "They get the same position", "It's determined randomly"], correctAnswer: "Advertiser A" },
  { id: 47, type: QuestionType.MULTIPLE_CHOICE, questionText: "A good ad group might be structured around:", options: ["All products on your website", "A specific product model like 'iPhone 14 Pro'", "The campaign's budget", "Your company's name"], correctAnswer: "A specific product model like 'iPhone 14 Pro'" },
  { id: 48, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is ROAS?", options: ["Revenue On Ad Site", "Return On Ad Spend", "Rate Of Ad Success", "Ranking Of Ad Site"], correctAnswer: "Return On Ad Spend" },
  { id: 49, type: QuestionType.MULTIPLE_CHOICE, questionText: "What is the main benefit of using Responsive Search Ads?", options: ["They are cheaper than other ad types", "They allow Google to automatically test different headline/description combinations to find the best performer", "They guarantee a 10/10 Quality Score", "They can include video and images"], correctAnswer: "They allow Google to automatically test different headline/description combinations to find the best performer" },
  { id: 50, type: QuestionType.MULTIPLE_CHOICE, questionText: "The keyword [red shoes] is what match type?", options: ["Broad Match", "Phrase Match", "Exact Match", "Negative Match"], correctAnswer: "Exact Match" },

  // Fill in the Blank
  { id: 51, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The three levels of account structure are Campaign, Ad Group, and ______.", correctAnswer: "Keywords" },
  { id: 52, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The metric that determines your ad position is called ______ ______.", correctAnswer: "ad rank" },
  { id: 53, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Google's 1-10 rating of your ad's relevance and quality is the ______ ______.", correctAnswer: "quality score" },
  { id: 54, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The most flexible but least controlled keyword setting is ______ ______.", correctAnswer: "broad match" },
  { id: 55, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Extra pieces of information like a phone number or site links are called ______ ______.", correctAnswer: "ad extensions" },
  { id: 56, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The bidding strategy focused on achieving a target Cost Per Acquisition is called ______ ______.", correctAnswer: "target CPA" },
  { id: 57, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The percentage of impressions that result in a click is called the ______-______ rate.", correctAnswer: "click through" },
  { id: 58, type: QuestionType.FILL_IN_THE_BLANK, questionText: "To prevent your ad from showing on irrelevant searches, you should use ______ ______.", correctAnswer: "negative keywords" },
  { id: 59, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The most restrictive keyword targeting is ______ ______.", correctAnswer: "exact match" },
  { id: 60, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Your bid multiplied by your Quality Score equals your ______ ______.", correctAnswer: "ad rank" },
  { id: 61, type: QuestionType.FILL_IN_THE_BLANK, questionText: "Ads on websites and in apps are part of the Google ______ ______.", correctAnswer: "display network" },
  { id: 62, type: QuestionType.FILL_IN_THE_BLANK, questionText: "CTR, ad relevance, and landing page experience are components of ______ ______.", correctAnswer: "quality score" },
  { id: 63, type: QuestionType.FILL_IN_THE_BLANK, questionText: "To add links to specific pages of your website under your main ad, use ______ extensions.", correctAnswer: "sitelink" },
  { id: 64, type: QuestionType.FILL_IN_THE_BLANK, questionText: "A bidding strategy that aims for a target Return On Ad Spend is called ______ ______.", correctAnswer: "target ROAS" },
  { id: 65, type: QuestionType.FILL_IN_THE_BLANK, questionText: "The three keyword match types for targeting are Broad, Phrase, and ______.", correctAnswer: "exact" },
];

export const allLearningContent: { [key: number]: Session } = {
  13: session13Content,
  14: session14Content,
  15: session15Content,
  16: session16Content,
};

export const allQuizQuestions: { [key: number]: Question[] } = {
  13: session13Questions,
  14: session14Questions,
  15: session15Questions,
  16: session16Questions,
};
