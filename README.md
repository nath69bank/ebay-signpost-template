# eBay Signpost Website Template

A professional affiliate-style signpost website that showcases a product and directs visitors to an eBay listing.

## How to Use

Open `index.html` and find-and-replace the following placeholders:

| Placeholder | Description | Example |
|---|---|---|
| `{{STORE_NAME}}` | Your eBay store name | "TechDeals UK" |
| `{{PRODUCT_NAME}}` | Full product name | "Apple AirPods Pro 2nd Gen" |
| `{{PRODUCT_DESCRIPTION}}` | 1-2 sentence description | "Premium wireless earbuds with..." |
| `{{PRODUCT_IMAGE}}` | URL to product image | "https://example.com/image.jpg" |
| `{{PRICE}}` | Display price with currency | "£149.99" |
| `{{PRICE_NUMBER}}` | Price number only (for schema) | "149.99" |
| `{{EBAY_LINK}}` | Full eBay listing URL | "https://www.ebay.co.uk/itm/..." |
| `{{SITE_URL}}` | This website's URL | "https://yoursite.vercel.app" |
| `{{FEATURE_1_TITLE}}` through `{{FEATURE_4_TITLE}}` | Feature headings | "Premium Build Quality" |
| `{{FEATURE_1_DESC}}` through `{{FEATURE_4_DESC}}` | Feature descriptions | "Precision-engineered from..." |
| `{{REVIEW_1_NAME}}` through `{{REVIEW_3_NAME}}` | Reviewer names | "James T." |
| `{{REVIEW_1_INITIALS}}` through `{{REVIEW_3_INITIALS}}` | 2-letter initials | "JT" |
| `{{REVIEW_1_DATE}}` through `{{REVIEW_3_DATE}}` | Review dates | "2 weeks ago" |
| `{{REVIEW_1_TEXT}}` through `{{REVIEW_3_TEXT}}` | Review text | "Excellent product, fast delivery..." |
| `{{FAQ_6_QUESTION}}` | Custom FAQ question | "Is this a genuine product?" |
| `{{FAQ_6_ANSWER}}` | Custom FAQ answer | "Yes, all items are genuine..." |

## Deploy to Vercel

1. Push to GitHub
2. Import at vercel.com/new
3. Deploy (no configuration needed)

## Compliance Notes

- This template clearly discloses that purchases are on eBay
- Does not claim to be affiliated with eBay Inc.
- Does not contain fake reviews, fake discounts, or false scarcity
- Includes proper affiliate/referral disclosure in the footer
