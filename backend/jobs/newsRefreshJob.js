import cron from "node-cron";
import {fetchAndStoreNewsDataArticles} from "../services/newsDataService.js";
import {fetchAndStoreRSSArticles} from "../services/rssFeedService.js";

export const scheduleNewsRefresh = () => {
    // Run every 2 minutes for testing
    cron.schedule('0 */6 * * *', async () => {
        const startTime = Date.now();
        console.log(`\n--- Starting news refresh at ${new Date().toISOString()} ---`);

        try {
            // Run NewsData and RSS in parallel with timeout
            const [newsDataResult, rssResult] = await Promise.allSettled([
                fetchAndStoreNewsDataArticles().catch(e => {
                    console.error('NewsData Error:', e.message);
                    return [];
                }),
                fetchAndStoreRSSArticles().catch(e => {
                    console.error('RSS Error:', e.message);
                    return [];
                })
            ]);

            const newsDataArticles = newsDataResult.status === 'fulfilled' ? newsDataResult.value : [];
            const rssArticles = rssResult.status === 'fulfilled' ? rssResult.value : [];

            console.log(`✅ Refresh completed:
  - NewsData: ${newsDataArticles.length} articles
  - RSS: ${rssArticles.length} articles
  - Total time: ${((Date.now() - startTime)/1000).toFixed(2)}s`);

        } catch (error) {
            console.error('❌ CRITICAL JOB ERROR:', error);
        }
    }, {
        scheduled: true,
        timezone: "Africa/Lagos"
    });
};