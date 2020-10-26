const request = require("supertest");
const session = require("supertest-session");
const app = require("../app");
const { connectToDb, UserAnswers } = require("../JS/orm");

describe("User API", () => {
  beforeAll(() => connectToDb());
  beforeEach(() => UserAnswers.truncate());

  describe("when logged in", () => {
    let signedInSession;

    beforeEach(() => {
      signedInSession = session(app);
      return signedInSession.get("/login").expect(302);
    });

    it("should have default of first question", () => {
      return signedInSession
        .get("/user/progress")
        .expect(200, { currentQuestionNumber: 1 });
    });

    it("should update progress when an answer is saved", async () => {
      await signedInSession
        .post("/user/answers/question/5")
        .send({ isCorrect: true, elapsedTimeMs: 150 })
        .expect(201);
      return signedInSession
        .get("/user/progress")
        .expect(200, { currentQuestionNumber: 6 });
    });

    it("should return up to 3 previous question timings for a question", async () => {
      for (let i = 1; i <= 4; i++) {
        await signedInSession
          .post("/user/answers/question/7")
          .send({ isCorrect: true, elapsedTimeMs: 100 * i });
      }

      return signedInSession.get("/user/answers/question/7").expect(200, {
        previousTimingMs: [400, 300, 200],
      });
    });
  });

  describe("when not logged in", () => {
    it("should respond with 401", () =>
      request(app).get("/user/progress").expect(401));
  });
});
