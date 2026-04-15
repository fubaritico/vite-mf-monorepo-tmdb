@e2e
Feature: Search and browse media

  As a visitor I can search for a movie by name,
  navigate to its detail page, and browse its photos.

  Background:
    Given I open the application
    Then the home page is visible

  @search
  Scenario: Searching for a movie, viewing details, and browsing photos
    When I type "incep" in the search field
    And I wait for search results to appear
    And I select "Inception" from the search results
    Then I am on the movie page for "Inception"
    When I click on a photo in the photos section
    Then the photo viewer is open
    When I go to the next photo
    And I go to the next photo
    And I go to the previous photo
    Then the photo viewer is open
    When I close the photo viewer by clicking the backdrop
    Then I am on a detail page
