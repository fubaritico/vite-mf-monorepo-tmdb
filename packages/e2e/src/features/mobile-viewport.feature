@e2e
Feature: Mobile viewport

  As a mobile user I see a responsive layout
  adapted for small screens.

  Background:
    Given I set the viewport to mobile
    And I open the application
    Then the home page is visible

  @responsive
  Scenario: Home page displays correctly on mobile
    Then the header is visible
    And I see at least one carousel of posters
    And carousel navigation arrows are hidden

  @responsive
  Scenario: Movie detail page displays correctly on mobile
    When I click on the first poster in a carousel
    Then I am on a detail page
    And the title is visible
    And the synopsis is visible
