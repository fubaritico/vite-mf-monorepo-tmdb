@e2e
Feature: Rapid search

  As a visitor I can type a search query quickly
  and the typeahead handles debouncing without crashing.

  Background:
    Given I open the application
    Then the home page is visible

  @search
  Scenario: Typing fast does not crash the typeahead
    When I type "inception" rapidly in the search field
    And I wait for search results to appear
    Then I see at least one search result
    And the page does not have any errors
