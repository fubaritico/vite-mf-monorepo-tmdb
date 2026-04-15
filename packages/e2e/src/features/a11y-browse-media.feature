@a11y
Feature: Accessibility — Browse media with keyboard

  As a visually impaired user I can navigate the home page,
  open a movie, and browse photos using only the keyboard.

  Background:
    Given I open the application
    Then the home page is visible

  @home
  Scenario: Home page is accessible and navigable by keyboard
    Then the page should have no accessibility violations
    When I tab to the first poster link
    And I press Enter on the focused element
    Then I am on a detail page
    And the page should have no accessibility violations

  @photos
  Scenario: Photo viewer is keyboard-navigable
    When I click on the first poster in a carousel
    And I am on a detail page
    And I click on a photo in the photos section
    Then the photo viewer is open
    And the "photo viewer" should have no accessibility violations
    When I tab to the button labeled "Next"
    And I press Enter on the focused element
    Then the photo viewer is open
    When I tab to the button labeled "Previous"
    And I press Enter on the focused element
    Then the photo viewer is open
    When I press Escape
    Then I am on a detail page
