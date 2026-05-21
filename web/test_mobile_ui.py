from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    
    # Thiết lập kích thước màn hình điện thoại (VD: iPhone 12 Pro)
    iphone_12_pro = playwright.devices['iPhone 12 Pro']
    context = browser.new_context(**iphone_12_pro)
    
    page = context.new_page()
    
    print("Testing Teacher Dashboard on Mobile...")
    page.goto("http://localhost:3000/login")
    page.fill("input[name='email']", "teacher@ielts.com")
    page.fill("input[name='password']", "123456")
    page.click("button[type='submit']")
    
    page.wait_for_url("**/teacher/dashboard")
    page.wait_for_selector("text=Chào buổi sáng")
    time.sleep(1.5)
    page.screenshot(path="teacher_dashboard_mobile.png", full_page=True)
    print("Mobile Teacher dashboard screenshot saved: teacher_dashboard_mobile.png")
    
    # Logout
    page.click("button:has-text('Đăng xuất')")
    page.wait_for_url("**/login")
    
    print("Testing AM Dashboard on Mobile...")
    page.fill("input[name='email']", "am@ielts.com")
    page.fill("input[name='password']", "123456")
    page.click("button[type='submit']")
    
    page.wait_for_url("**/am/dashboard")
    page.wait_for_selector("text=Cảnh Báo Cần Xử Lý")
    time.sleep(1.5)
    page.screenshot(path="am_dashboard_mobile.png", full_page=True)
    print("Mobile AM dashboard screenshot saved: am_dashboard_mobile.png")
    
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
