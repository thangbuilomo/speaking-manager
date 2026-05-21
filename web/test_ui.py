from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})
    
    # 1. Test Login & Teacher Dashboard
    print("Testing Teacher Dashboard...")
    page.goto("http://localhost:3000/login")
    page.fill("input[name='email']", "teacher@ielts.com")
    page.fill("input[name='password']", "123456")
    page.click("button[type='submit']")
    
    page.wait_for_url("**/teacher/dashboard")
    page.wait_for_selector("text=Chào buổi sáng") # Wait for main content
    time.sleep(1.5) # Allow Tailwind CSS rendering and transitions to complete
    page.screenshot(path="teacher_dashboard.png")
    print("Teacher dashboard screenshot saved: teacher_dashboard.png")
    
    # Logout
    page.click("button:has-text('Đăng xuất')")
    page.wait_for_url("**/login")
    
    # 2. Test Login & AM Dashboard
    print("Testing AM Dashboard...")
    page.fill("input[name='email']", "am@ielts.com")
    page.fill("input[name='password']", "123456")
    page.click("button[type='submit']")
    
    page.wait_for_url("**/am/dashboard")
    page.wait_for_selector("text=Cảnh Báo Cần Xử Lý") # Wait for main content
    time.sleep(1.5) # Allow Tailwind CSS rendering and transitions to complete
    page.screenshot(path="am_dashboard.png")
    print("AM dashboard screenshot saved: am_dashboard.png")
    
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
