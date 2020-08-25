import "mocha";
import * as sinon from "sinon";
import { loginService, setPasswordService } from "./auth.service";
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

      const expectedValue = {
        status: 400,
        data: { message: "User with that email doesn't exists" },
      };

      sinon.assert.match(
        await loginService({ email: "", password: "" }),
        expectedValue
      );
    });

    it("should return error if password is invalid", async function () {
      (User.findOne as sinon.SinonStub).resolves({});
      (bcrypt.compare as sinon.SinonStub).resolves(false);

      const expectedValue = {
        status: 400,
        data: { message: "Invalid password" },
      };

      sinon.assert.match(
        await loginService({ email: "", password: "" }),
        expectedValue
      );
    });

    it("should return token on success", async function () {
      (User.findOne as sinon.SinonStub).resolves({ hashPassword: "" });
      (bcrypt.compare as sinon.SinonStub).resolves(true);
      (tokenHelpers.createToken as sinon.SinonStub).callsFake(
        () => "mock_token"
      );
      const expectedValue = {
        status: 200,
        data: "mock_token",
      };

      sinon.assert.match(
        await loginService({ email: "", password: "" }),
        expectedValue
      );
    });
  });

  describe("setPasswordService", async () => {
    beforeEach(function () {
      sinon.stub(User, "findOne");
      sinon.stub(bcrypt, "hash");
      sinon.stub(bcrypt, "genSalt");
      sinon.stub(tokenHelpers, "decodeToken");
    });

    afterEach(function () {
      (User.findOne as sinon.SinonStub).restore();
      (bcrypt.hash as sinon.SinonStub).restore();
      (bcrypt.genSalt as sinon.SinonStub).restore();
      (tokenHelpers.decodeToken as sinon.SinonStub).restore();
    });

    it("should return error if user is null", async function () {
      (tokenHelpers.decodeToken as sinon.SinonStub).resolves({ email: "" });
      (User.findOne as sinon.SinonStub).resolves(null);
      (bcrypt.hash as sinon.SinonStub).resolves("");
      (bcrypt.genSalt as sinon.SinonStub).resolves("");

      const expectedValue = {
        status: 400,
        data: { message: "User with that email dosen't exists" },
      };

      sinon.assert.match(
        await setPasswordService({ token: "", password: "", password2: "" }),
        expectedValue
      );
    });

    it("should return error if save was unsuccessful", async function () {
      const error = new Error("Custom error");
      (tokenHelpers.decodeToken as sinon.SinonStub).resolves({ email: "" });
      (bcrypt.hash as sinon.SinonStub).resolves("");
      (bcrypt.genSalt as sinon.SinonStub).resolves("");
      (User.findOne as sinon.SinonStub).resolves({
        save: () => {
          throw error;
        },
      });

      const expectedValue = {
        status: 500,
        data: error,
      };

      sinon.assert.match(
        await setPasswordService({ token: "", password: "", password2: "" }),
        expectedValue
      );
    });

    it("should return saved User if save was successful", async function () {
      (tokenHelpers.decodeToken as sinon.SinonStub).resolves({ email: "" });
      const user = { id: "0" };
      (User.findOne as sinon.SinonStub).resolves({
        save: () => {
          return Promise.resolve(user);
        },
      });

      const expectedValue = {
        status: 200,
        data: user,
      };

      sinon.assert.match(
        await setPasswordService({ token: "", password: "", password2: "" }),
        expectedValue
      );
    });
  });
});
