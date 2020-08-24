import "mocha";
import * as sinon from "sinon";
import { loginService } from "./auth.service";
import { describe } from "mocha";

import bcrypt from "bcryptjs";

describe("[AuthService]", () => {
  describe("loginService", async () => {
    let { User } = await import("../model/user");

    beforeEach(function () {
      sinon.stub(User, "findOne");
    });

    afterEach(function () {
      (User.findOne as sinon.SinonStub).restore();
    });

    it("should return error if user is null", async function () {
      (User.findOne as sinon.SinonStub).resolves(null);
      const qwe = await loginService({ email: "", password: "qwe" });
      sinon.assert.match(qwe, {
        status: 400,
        data: { message: "User with that email doesn't exists" },
      });
    });

    it("should return error if password is invalid", async function () {
      (User.findOne as sinon.SinonStub).resolves({ hashPassword: "" });
      var bcryptStub = sinon.stub(bcrypt, "compare").callsFake(() => false);
      sinon.assert.match(await loginService({ email: "", password: "" }), {
        status: 400,
        data: { message: "Invalid password" },
      });
      bcryptStub.restore();
    });
  });
});
