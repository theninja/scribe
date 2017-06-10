import * as nodeHelpers from '../src/node';

var chai = require('chai');

var assert = chai.assert;

var MockBrowser = require('mock-browser').mocks.MockBrowser;
var fakeBrowser = new MockBrowser();
var doc = fakeBrowser.getDocument();

var FakeNode = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3
};

describe('Node type checking', function() {
  describe('nodes with a particular class', function() {
    it('provides a checking function', function() {
      var checkFunction = nodeHelpers.elementHasClass(FakeNode, 'test');
      assert.isFunction(checkFunction);
    });

    it('checks that a particular class is present', function() {
      var checkFunction = nodeHelpers.elementHasClass(FakeNode, 'test');
      var fakeElement = doc.createElement('div');
      fakeElement.className = 'test';

      assert.isTrue(checkFunction(fakeElement));
    });

    it('checks that a particular class is not present', function() {
      var checkFunction = nodeHelpers.elementHasClass(FakeNode, 'test');
      var fakeElement = doc.createElement('div');

      assert.isFalse(checkFunction(fakeElement));

      fakeElement.className = 'fake-name';

      assert.isFalse(checkFunction(fakeElement));
    });
  });

  describe('for whether a node has content', function() {
    it('should detect a BR element', function() {
      var fakeNode = {nodeName: "BR"};

      assert.isTrue(nodeHelpers.hasContent(fakeNode));
    });

    it('should detect a node has children', function() {
      var fakeNode = {nodeName: "DIV", children: [{}]};

      assert.isTrue(nodeHelpers.hasContent(fakeNode));

    });

    it('should detect a non-BR node', function() {
      var fakeNode = {nodeName: "P"};

      assert.isFalse(nodeHelpers.hasContent(fakeNode));
    });
  });

  describe('text nodes', function() {
    describe('that are whitespace-only', function() {
      it('are detected', function() {
        var emptyTextNode = {
          nodeValue: "   ",
          nodeType: 3
        }

        assert.isTrue(nodeHelpers.isWhitespaceOnlyTextNode(FakeNode, emptyTextNode), "Whitespace-only node not detected correctly");
      });

      it('are not falsely identified', function() {
        var testNode = {
          nodeValue: "hello world",
          nodeType: 3
        }

        assert.isFalse(nodeHelpers.isWhitespaceOnlyTextNode(FakeNode, testNode), "Regular text node identified as whitespace-only");

      });
    });
    describe('that have non-whitespace content', function() {
      it('are correctly detected', function() {
        var fakeNode = {
          nodeValue: "hello world",
          nodeType: 3
        };

        assert.isTrue(nodeHelpers.isTextNodeWithContent(FakeNode, fakeNode), "Text node with content not detected as having content.");
      });

      it('but are actually empty', function() {
        var fakeNode = {
          nodeValue: "",
          nodeType: 3
        };

        assert.isFalse(nodeHelpers.isTextNodeWithContent(FakeNode, fakeNode), "Empty text node detected as having content.");
      });

      it('but only whitespace', function() {
        var fakeNode = {
          nodeValue: "     ",
          nodeType: 3
        };

        assert.isFalse(nodeHelpers.isTextNodeWithContent(FakeNode, fakeNode), "Whitespace-only text node detected as having content.");
      });
    });
  });
});
