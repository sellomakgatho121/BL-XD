import { test, expect } from '@playwright/test';

test.describe('Marketing Site', () => {
  test('landing page loads and shows hero', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Blacklight/i);
    await expect(page.locator('text=Blacklight')).toBeVisible();
  });

  test('services page loads', async ({ page }) => {
    await page.goto('/services');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('portfolio page loads with filter controls', async ({ page }) => {
    await page.goto('/portfolio');
    await expect(page.locator('h1')).toBeVisible();
    // Should have filter buttons
    await expect(page.locator('text=All')).toBeVisible();
  });

  test('contact page loads with form', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('form')).toBeVisible();
  });

  test('blog page loads', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('pricing page loads', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation is present
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });
});

test.describe('Auth Pages', () => {
  test('login page loads', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('text=PORTAL ACCESS')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test('login page shows OAuth buttons', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('text=Continue with Google')).toBeVisible();
    await expect(page.locator('text=Continue with GitHub')).toBeVisible();
  });

  test('login page has magic link toggle', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('text=Magic Link')).toBeVisible();
  });

  test('register page loads', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test('unauthenticated portal access redirects to login', async ({ page }) => {
    await page.goto('/portal/dashboard');
    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
  });

  test('unauthenticated admin access redirects to login', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
  });
});
