@e2e
Feature: Search results page

  As a visitor I can submit a search query, view the results page
  with categorized sections, then refine my search and navigate to a movie.

  Background:
    Given I open the application
    Then the home page is visible

  @search
  Scenario: Submitting a search, viewing results, and navigating to a movie
    When I type "deep" in the search field
    And I press Enter in the search field
    Then I am on the search results page for "deep"
    And I see the heading "deep"
    And I see the section "Movies"
    And I see the section "TV Shows"
    When I type "gladiator" in the search bar on the results page
    And I submit the search bar
    Then I am on the search results page for "gladiator"
    And "Gladiator" is in the "Movies" section
    When I click on "Gladiator" in the "Movies" section
    Then I am on the movie page for "Gladiator"
