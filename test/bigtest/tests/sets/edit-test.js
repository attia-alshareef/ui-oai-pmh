import {
  beforeEach,
  describe,
  it,
} from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import SetsFormInteractor from '../../interactors/sets-form';
import translation from '../../../../translations/ui-oai-pmh/en';

describe('Sets', () => {
  describe('Edit', () => {
    setupApplication();
    let setsTest;

    beforeEach(function () {
      setsTest = this.server.create('set');

      this.visit(`/settings/oai-pmh/sets/${setsTest.id}/edit`);
    });

    describe('Pane header', () => {
      it('should render correct title', () => {
        expect(SetsFormInteractor.paneHeader.title).to.equal(`Edit ${setsTest.name}`);
      });
    });

    describe('Entity not found', () => {
      setupApplication({
        scenarios: 'sets-not-found',
      });

      const currentPath = '/settings/oai-pmh/sets/id_not_found/edit';

      beforeEach(function () {
        this.visit(currentPath);
      });

      it('should render correct title', () => {
        expect(SetsFormInteractor.paneHeaderSetNotFound.title).to.equal(translation['settings.sets.edit.notFound.title']);
      });

      it('should render correct text', () => {
        expect(SetsFormInteractor.setNotFoundMessageBanner.text).to.equal(translation['settings.sets.edit.notFound.text']);
      });

      describe('navigate back', () => {
        beforeEach(async () => {
          await SetsFormInteractor.paneHeaderSetNotFound.dismissButton.click();
        });

        it('should navigate back to sets list page', function () {
          expect(this.location.pathname).to.equal('/settings/oai-pmh/sets');
        });
      });
    });
  });
});
