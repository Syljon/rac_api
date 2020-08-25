import "mocha";
import * as sinon from "sinon";
import { loginService } from "./auth.service";
import { describe } from "mocha";

import bcrypt from "bcryptjs";
import { User } from "../model/user";
import * as tokenHelpers from "../helpers/token";

describe("[AuthService]", () => {
  describe("loginService", async () => {
    beforeEach(function () {
      sinon.stub(User, "findOne");
      sinon.stub(bcrypt, "compare");
      sinon.stub(tokenHelpers, "createToken");
    });

    afterEach(function () {
      (User.findOne as sinon.SinonStub).restore();
      (bcrypt.compare as sinon.SinonStub).restore();
      (tokenHelpers.createToken as sinon.SinonStub).restore();
    });

    it("should return error if user is null", async function () {
      (User.findOne as sinon.SinonStub).resolves(null);
      sinon.assert.match(await loginService({ email: "", password: "" }), {
        status: 400,
        data: { message: "User with that email doesn't exists" },
      });
    });

    it("should return error if password is invalid", async function () {
      (User.findOne as sinon.SinonStub).resolves({});
      (bcrypt.compare as sinon.SinonStub).resolves(false);
      sinon.assert.match(await loginService({ email: "", password: "" }), {
        status: 400,
        data: { message: "Invalid password" },
      });
    });

    it("should return token on success", async function () {
      (User.findOne as sinon.SinonStub).resolves({ hashPassword: "" });
      (bcrypt.compare as sinon.SinonStub).resolves(true);
      (tokenHelpers.createToken as sinon.SinonStub).callsFake(
        () => "mock_token"
      );
      sinon.assert.match(await loginService({ email: "", password: "" }), {
        status: 200,
        data: "mock_token",
      });
    });
  });
});
