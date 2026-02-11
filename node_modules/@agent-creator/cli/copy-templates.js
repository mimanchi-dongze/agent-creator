import fs from 'fs-extra';
import path from 'path';

const srcDir = path.resolve('src/templates');
const destDir = path.resolve('dist/templates');

async function copy() {
    try {
        if (await fs.pathExists(srcDir)) {
            await fs.copy(srcDir, destDir);
            console.log('✅ Templates copied to dist/templates');
        } else {
            console.warn('⚠️ No templates found in src/templates');
        }
    } catch (err) {
        console.error('❌ Failed to copy templates:', err);
        process.exit(1);
    }
}

copy();
