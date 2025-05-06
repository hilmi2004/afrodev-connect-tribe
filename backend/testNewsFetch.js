import { fetchAndStoreNewsDataArticles } from './services/newsDataService.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function test() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to MongoDB');

        const results = await fetchAndStoreNewsDataArticles();
        console.log(`Saved ${results.length} articles`);

        // Verify in database
        const count = await mongoose.connection.db.collection('newsarticles').countDocuments();
        console.log(`Total articles in DB: ${count}`);

        // Show some samples
        const samples = await mongoose.connection.db.collection('newsarticles')
            .find({})
            .limit(3)
            .toArray();

        console.log('Sample articles:', samples.map(a => ({
            title: a.title,
            category: a.category,
            url: a.url
        })));

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
}

test();