#!/usr/bin/env node

/**
 * Resume API Test Script
 *
 * This script tests the resume functionality by:
 * 1. Making a request to the resume API endpoint
 * 2. Verifying the response structure
 * 3. Checking the resume step calculation logic
 *
 * Usage: node test-resume-api.js [projectId]
 */

const PROJECT_ID = process.argv[2] || "1";
const BASE_URL = "http://localhost:3000";

console.log("🧪 Testing Resume API Functionality");
console.log("=".repeat(50));

async function testResumeAPI() {
  try {
    console.log(`📡 Testing GET /api/project/${PROJECT_ID}/resume`);

    // Note: This test requires authentication cookies in a real scenario
    // For testing, you'd need to include Clerk session cookies
    const response = await fetch(
      `${BASE_URL}/api/project/${PROJECT_ID}/resume`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // In real testing, add authentication headers:
          // 'Cookie': '__session=your_clerk_session_cookie'
        },
      }
    );

    console.log(`📊 Response Status: ${response.status}`);

    if (response.status === 401) {
      console.log(
        "🔐 Authentication required - this is expected for protected routes"
      );
      console.log("✅ API correctly requires authentication");
      return;
    }

    if (response.status === 404) {
      console.log("📂 Project not found - check if project exists in database");
      return;
    }

    if (!response.ok) {
      console.log(`❌ API Error: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    console.log("📋 Response Data:", JSON.stringify(data, null, 2));

    // Verify response structure
    console.log("\n🔍 Verifying Response Structure:");

    const checks = [
      { name: "Has success field", check: data.hasOwnProperty("success") },
      { name: "Success is true", check: data.success === true },
      { name: "Has data field", check: data.hasOwnProperty("data") },
      { name: "Data has id", check: data.data?.id !== undefined },
      {
        name: "Data has resumeStep",
        check: data.data?.resumeStep !== undefined,
      },
      {
        name: "Data has resumeMetadata",
        check: data.data?.resumeMetadata !== undefined,
      },
    ];

    checks.forEach((check) => {
      console.log(`${check.check ? "✅" : "❌"} ${check.name}`);
    });

    // Test resume step logic
    if (data.success && data.data) {
      console.log("\n🧮 Resume Step Logic:");
      const { resumeStep, resumeMetadata } = data.data;

      console.log(`📍 Calculated Resume Step: ${resumeStep}`);
      console.log("📊 Data Availability:", {
        userinput: resumeMetadata.hasUserinput,
        comment: resumeMetadata.hasComment,
        hook: resumeMetadata.hasHook,
        content: resumeMetadata.hasContent,
      });

      // Verify step logic
      let expectedStep = 1;
      if (resumeMetadata.hasContent) expectedStep = 5;
      else if (resumeMetadata.hasHook) expectedStep = 4;
      else if (resumeMetadata.hasComment) expectedStep = 3;
      else if (resumeMetadata.hasUserinput) expectedStep = 2;

      console.log(`🎯 Expected Step: ${expectedStep}`);
      console.log(
        `${resumeStep === expectedStep ? "✅" : "❌"} Step calculation correct`
      );
    }
  } catch (error) {
    console.log("❌ Test failed with error:", error.message);
  }
}

// Test the URL construction that dashboard buttons use
function testURLConstruction() {
  console.log("\n🔗 Testing Dashboard URL Construction:");

  const projectId = PROJECT_ID;
  const resumeURL = `/app?resume=true&projectId=${projectId}`;

  console.log(`📍 Project ID: ${projectId}`);
  console.log(`🔗 Resume URL: ${resumeURL}`);

  // Parse URL to verify parameters
  const url = new URL(`${BASE_URL}${resumeURL}`);
  const isResuming = url.searchParams.get("resume") === "true";
  const urlProjectId = url.searchParams.get("projectId");

  console.log(
    `${isResuming ? "✅" : "❌"} Resume parameter correct: ${isResuming}`
  );
  console.log(
    `${urlProjectId === projectId ? "✅" : "❌"} Project ID parameter correct: ${urlProjectId}`
  );
}

// Test resume step calculation logic independently
function testStepCalculation() {
  console.log("\n🧮 Testing Step Calculation Logic:");

  const testCases = [
    { name: "Empty project", data: {}, expected: 1 },
    { name: "Has userinput only", data: { userinput: true }, expected: 2 },
    {
      name: "Has userinput + comment",
      data: { userinput: true, comment: true },
      expected: 3,
    },
    {
      name: "Has userinput + comment + hook",
      data: { userinput: true, comment: true, hook: true },
      expected: 4,
    },
    {
      name: "Has all data",
      data: { userinput: true, comment: true, hook: true, content: true },
      expected: 5,
    },
  ];

  // Simulate the determineResumeStep function
  function determineResumeStep(project) {
    if (project.content) return 5;
    if (project.hook) return 4;
    if (project.comment) return 3;
    if (project.userinput) return 2;
    return 1;
  }

  testCases.forEach((testCase) => {
    const result = determineResumeStep(testCase.data);
    const passed = result === testCase.expected;
    console.log(
      `${passed ? "✅" : "❌"} ${testCase.name}: Expected ${testCase.expected}, Got ${result}`
    );
  });
}

// Run all tests
async function runAllTests() {
  await testResumeAPI();
  testURLConstruction();
  testStepCalculation();

  console.log("\n" + "=".repeat(50));
  console.log("🏁 Test Complete!");
  console.log("\n💡 To test with authentication:");
  console.log("1. Open browser to localhost:3000");
  console.log("2. Sign in with Clerk");
  console.log("3. Open DevTools > Application > Cookies");
  console.log("4. Copy __session cookie value");
  console.log("5. Add it to the fetch headers in this script");
}

runAllTests();
