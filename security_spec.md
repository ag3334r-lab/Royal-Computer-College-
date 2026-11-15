# Security Specification - Royal College

## Data Invariants
1. Users: A user document can only be created by the authenticated user with matching UID. Roles like 'teacher' or 'admin' cannot be self-assigned (default to 'student').
2. Courses: Only users with 'teacher' or 'admin' role can create/update courses.
3. Enrollments: A student can only enroll themselves. `userId` must match `request.auth.uid`.
4. Quizzes: Only teachers can create quizzes for their courses.
5. QuizResults: Only the student who took the quiz can see their result.

## The Dirty Dozen Payloads

1. **Self-Elevate to Admin**: Create user doc with `role: 'admin'`.
2. **Impersonate User**: Create user doc with different UID.
3. **Ghost Course**: Create course with random `instructorId`.
4. **Unauthorized Course Edit**: Student tries to edit course description.
5. **Shadow Enrollment**: Enroll someone else in a course.
6. **Progress Spoofing**: Update enrollment progress to 100% without completing modules.
7. **Fake Certificate**: Create certificate doc without completing course.
8. **Quiz Hijack**: Student tries to delete a quiz.
9. **Result Tampering**: Update quiz score to 100%.
10. **PII Leak**: Read private email of another user.
11. **Resource Poisoning**: Create doc with 1MB string in title.
12. **Orphaned Enrollment**: Enroll in a non-existent course.

## Test Runner (Draft)
```ts
// firestore.rules.test.ts
// ... (implementation details following the spec)
```
