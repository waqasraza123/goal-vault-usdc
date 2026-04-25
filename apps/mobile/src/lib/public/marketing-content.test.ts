import assert from "node:assert/strict";
import test from "node:test";

import { getHowItWorksPageModel, getLandingPageModel, getSecurityPageModel } from "./marketing-content";

test("landing page model exposes a complete premium public story in english", () => {
  const model = getLandingPageModel("en");

  assert.equal(model.heroActions.length, 2);
  assert.equal(model.heroActions[0].href, "/vaults/new");
  assert.equal(model.heroActions[1].href, "/vaults");
  assert.equal(model.secondaryAction.href, "/how-it-works");
  assert.equal(model.storyCards.length, 3);
  assert.equal(model.ruleCards.length, 3);
  assert.ok(model.storyCards.every((card) => card.title.length > 0 && card.description.length > 0));
  assert.ok(model.ruleCards.every((card) => card.eyebrow.length > 0 && card.title.length > 0 && card.description.length > 0));
});

test("landing page model stays fully populated in arabic", () => {
  const model = getLandingPageModel("ar");

  assert.equal(model.heroActions.length, 2);
  assert.equal(model.storyCards.length, 3);
  assert.equal(model.ruleCards.length, 3);
  assert.ok(model.heroActions.every((action) => action.label.length > 0));
  assert.ok(model.storyCards.every((card) => card.title.length > 0));
  assert.ok(model.ruleCards.every((card) => card.title.length > 0));
});

test("how it works route model keeps create-first and security-second CTA hierarchy", () => {
  const model = getHowItWorksPageModel("en");

  assert.equal(model.primaryAction.href, "/vaults/new");
  assert.equal(model.secondaryAction.href, "/security");
  assert.equal(model.highlightItems.length, 3);
  assert.equal(model.insightPoints.length, 4);
});

test("security route model keeps create-first and explanatory-secondary CTA hierarchy", () => {
  const model = getSecurityPageModel("en");

  assert.equal(model.primaryAction.href, "/vaults/new");
  assert.equal(model.secondaryAction.href, "/how-it-works");
  assert.equal(model.highlightItems.length, 3);
  assert.equal(model.insightPoints.length, 4);
});
