# 🧪 Resume Flow End-to-End Test

## Prerequisites

- User must be authenticated with Clerk
- User must have at least one project in the database
- Development server running on localhost

## Test Scenarios

### 📋 Test 1: Complete Resume Flow

**Goal**: Verify full user journey from dashboard to resumed project

**Steps**:

1. **Dashboard Access**
   - [ ] Navigate to `/dashboard`
   - [ ] Verify projects are displayed in overview table
   - [ ] Verify "Continue" buttons are visible

2. **Continue Button Click**
   - [ ] Click "Continue" on any project
   - [ ] Verify URL changes to `/app?resume=true&projectId=X`
   - [ ] Check browser console for resume logs

3. **App Page Resume Detection**
   - [ ] Verify loading state appears ("Loading Project...")
   - [ ] Check console for resume API call logs
   - [ ] Verify no authentication redirects occur

4. **Resume API Response**
   - [ ] Check Network tab for `/api/project/X/resume` call
   - [ ] Verify 200 response with project data
   - [ ] Check console for resume step calculation

5. **MultiStepForm Hydration**
   - [ ] Verify form starts at correct step (not step 1)
   - [ ] Check console for state hydration logs
   - [ ] Verify blue resume banner appears
   - [ ] Verify previous data is pre-filled

---

### 📋 Test 2: Different Resume Steps

**Goal**: Test resume from different completion stages

**Test Cases**:

#### **A. Resume from Step 2 (Has userinput only)**

- [ ] Form starts at Step 2 (SelectComment)
- [ ] Comments are auto-fetched
- [ ] Skip button shows previous userinput
- [ ] Can select new comment or continue with skip

#### **B. Resume from Step 3 (Has userinput + comment)**

- [ ] Form starts at Step 3 (SelectHook)
- [ ] Previous comment is displayed
- [ ] Skip button shows previous comment text
- [ ] Can select new hook or continue with skip

#### **C. Resume from Step 4 (Has userinput + comment + hook)**

- [ ] Form starts at Step 4 (ProductionSwitch)
- [ ] All previous data is loaded
- [ ] "Continue to Content Generation" button works
- [ ] Advances to Step 5 properly

#### **D. Resume from Step 5 (Has all data)**

- [ ] Form starts at Step 5 (StructureGenerator)
- [ ] All data passed to content generator
- [ ] Previous content displayed if exists

---

### 📋 Test 3: Error Handling

**Goal**: Verify proper error handling and recovery

**Test Cases**:

#### **A. Invalid Project ID**

- [ ] Navigate to `/app?resume=true&projectId=99999`
- [ ] Verify error page appears
- [ ] Verify "Back to Dashboard" button works
- [ ] Verify "Start New Project" button works

#### **B. Unauthorized Access**

- [ ] Sign out of Clerk
- [ ] Navigate to `/app?resume=true&projectId=123`
- [ ] Verify redirect to sign-in page
- [ ] Verify return URL preserves resume parameters

#### **C. Network Errors**

- [ ] Block `/api/project/*/resume` in Network tab
- [ ] Click continue button
- [ ] Verify error message appears
- [ ] Verify recovery options available

---

### 📋 Test 4: Database Updates

**Goal**: Verify all steps save to database properly

**Test Cases**:

#### **A. Step Navigation Saves**

- [ ] Resume project at Step 2
- [ ] Select different comment
- [ ] Check database for updated comment field
- [ ] Continue to Step 3
- [ ] Select different hook
- [ ] Check database for updated hook field

#### **B. Content Generation Saves**

- [ ] Complete flow to Step 5
- [ ] Generate content
- [ ] Check database for saved content field
- [ ] Verify `content_count` increments

---

### 📋 Test 5: UI/UX Verification

**Goal**: Verify user experience elements

**Test Cases**:

#### **A. Visual Indicators**

- [ ] Resume banner displays correct step number
- [ ] Stepper shows completed steps in different color
- [ ] Skip buttons show truncated previous selections
- [ ] Loading states appear during API calls

#### **B. Navigation Flow**

- [ ] Back buttons work in resumed projects
- [ ] Forward navigation respects existing data
- [ ] Can re-select options if desired
- [ ] Final content includes all selections

---

## 🔍 Console Log Checkpoints

**Expected Logs During Resume**:

```
🔍 App Page - URL params: { isResuming: true, projectId: "123" }
🚀 App Page - Starting resume fetch for project: 123
📡 App Page - Resume API response status: 200
✅ App Page - Resume data set: { projectId: "123", resumeStep: 3, ... }
🔄 MultiStepForm - Hydrating with resume data: { ... }
✅ MultiStepForm - Project ID set: 123
✅ MultiStepForm - User input data hydrated: { ... }
✅ MultiStepForm - Selected comment hydrated: { ... }
✅ MultiStepForm - Current step set to: 3
```

---

## 🐛 Debug Commands

**Check Database State**:

```sql
SELECT id, system_userid, userinput, comment, hook, content, hook_count, content_count
FROM project
WHERE id = X;
```

**Check API Response**:

```bash
curl -H "Cookie: __session=..." http://localhost:3000/api/project/123/resume
```

**Check Clerk Authentication**:

```javascript
// In browser console
console.log(window.Clerk?.user);
```

---

## ✅ Success Criteria

**All tests pass if**:

- [ ] Continue buttons navigate to correct resume URLs
- [ ] Resume API returns proper data and step calculation
- [ ] MultiStepForm starts at correct step with pre-filled data
- [ ] Skip buttons work for completed steps
- [ ] Database updates occur on step changes
- [ ] Error handling provides recovery options
- [ ] UI indicators clearly show resume state

---

**🎯 Ready to run these tests! The complete resume system should work flawlessly.**
