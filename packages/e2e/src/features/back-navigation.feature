@e2e
Feature: Back navigation

  As a visitor I can navigate to a movie detail page
  and press the browser back button to return to the home page.

  Background:
    Given I open the application
    Then the home page is visible

  @navigation
  Scenario: Browser back returns to home page from a detail page
    When I click on the first poster in a carousel
    Then I am on a detail page
    When I press the browser back button
    Then the home page is visible

  @navigation
  Scenario: Browser back returns to detail page from photo viewer
    When I click on the first poster in a carousel
    And I am on a detail page
    And I click on a photo in the photos section
    Then the photo viewer is open
    When I press the browser back button
    Then I am on a detail page
