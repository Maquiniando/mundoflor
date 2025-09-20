import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    reporter: [['html']],
    retries: 1,
    use: {
        trace: 'on-first-retry',
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
