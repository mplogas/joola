/**
 *  @title joola.io
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

var async = require('async');

describe("api-permissions", function () {
  before(function (done) {
    this.context = {user: _token.user};
    this.uid = joola.common.uuid();
    this.organization = 'test-org-' + joola.common.uuid();
    done();
  });

  it("should add a permission", function (done) {
    var permission = {
      name: 'test-permission-' + this.uid
    };
    joola.dispatch.permissions.add(this.context, permission, function (err, _permission) {
      if (err)
        return done(err);

      expect(_permission).to.be.ok;
      done();
    });
  });

  it("should return a valid list of permissions", function (done) {
    joola.dispatch.permissions.list(this.context, function (err, permissions) {
      return done(err);
    });
  });

  it("should fail adding an existing permission", function (done) {
    var permission = {
      name: 'test-permission-' + this.uid
    };
    joola.dispatch.permissions.add(this.context, permission, function (err, _permission) {
      if (err)
        return done();

      return done(new Error('This should fail'));
    });
  });

  it("should delete a permission", function (done) {
    var self = this;
    var permission = {
      name: 'test-permission-' + this.uid
    };
    joola.dispatch.permissions.delete(this.context, permission, function (err) {
      if (err)
        return done(err);

      joola.dispatch.permissions.list(self.context, function (err, permissions) {
        if (err)
          return done(err);

        var exist = _.filter(permissions, function (item) {
          return item.name == 'test-permission';
        });
        try {
          expect(exist.length).to.equal(0);
          done();
        }
        catch (ex) {
          done(ex);
        }
      });
    });
  });

  it("should fail deleting a non existing permission", function (done) {
    var permission = {
      name: 'test-permission-notexist'
    };
    joola.dispatch.permissions.delete(this.context, permission, function (err) {
      if (err)
        return done();

      return done(new Error('This should fail'));
    });
  });
});