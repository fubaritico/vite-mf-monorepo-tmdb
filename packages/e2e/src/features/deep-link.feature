@e2e @deep-link
Feature: Deep link resilience

  As a visitor I can access a page directly via URL
  without navigating from the home page first.

  Scenario: Direct URL to a movie detail page loads correctly
    Given I navigate directly to "/movie/278"
    Then the media remote is loaded
    And the title is visible
    And the synopsis is visible

  Scenario: Direct URL to a search results page loads correctly
    Given I navigate directly to "/search/inception"
    Then the search remote is loaded
    And I see search results
