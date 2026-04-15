@e2e
Feature: Browse TV series from Popular section

  As a visitor I can switch to the TV Shows tab in the Popular section,
  click a TV series, and view its detail page with available content.

  Background:
    Given I open the application
    Then the home page is visible

  @tv @navigation
  Scenario: Navigating to a TV series detail page from Popular
    When I click the "TV Shows" tab in the "What's Popular" section
    And I click the first poster in that section
    Then the URL contains "/tv/"
    And the media remote is loaded
    And the hero section is visible
    And the synopsis section is visible
    And the cast section is visible
