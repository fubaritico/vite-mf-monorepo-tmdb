@e2e
Feature: Search empty state

  As a visitor I can search for a nonexistent term
  and see an appropriate empty state with no result sections.

  Background:
    Given I open the application
    Then the home page is visible

  @search
  Scenario: Searching for gibberish shows no result sections
    When I type "xyzqwerty99999" in the search field
    And I submit the search directly
    Then I am on the search results page for "xyzqwerty99999"
    And I see the heading "xyzqwerty99999"
    And I see no result sections
