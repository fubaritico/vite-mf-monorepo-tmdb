import { Typeahead } from '@vite-mf-monorepo/ui'
import { useCallback, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

const allFruits = [
  { id: '1', label: 'Apple', emoji: '🍎' },
  { id: '2', label: 'Banana', emoji: '🍌' },
  { id: '3', label: 'Cherry', emoji: '🍒' },
  { id: '4', label: 'Grape', emoji: '🍇' },
  { id: '5', label: 'Mango', emoji: '🥭' },
  { id: '6', label: 'Orange', emoji: '🍊' },
  { id: '7', label: 'Peach', emoji: '🍑' },
  { id: '8', label: 'Pineapple', emoji: '🍍' },
  { id: '9', label: 'Strawberry', emoji: '🍓' },
  { id: '10', label: 'Watermelon', emoji: '🍉' },
]

const meta = {
  title: 'Design System/Typeahead',
  component: Typeahead,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['light', 'dark'],
    },
    debounceMs: {
      control: 'number',
    },
    clearOnSelect: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Typeahead>

export default meta
type Story = StoryObj<typeof meta>

const PlaygroundComponent = (args: {
  variant?: 'light' | 'dark'
  debounceMs?: number
  clearOnSelect?: boolean
}) => {
  const [results, setResults] = useState(allFruits)
  const [selected, setSelected] = useState<string>()

  const handleSearch = useCallback((query: string) => {
    if (!query) {
      setResults(allFruits)
      return
    }
    setResults(
      allFruits.filter((f) =>
        f.label.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [])

  const handleSelect = useCallback((value: string) => {
    setSelected(value)
  }, [])

  const selectedFruit = allFruits.find((f) => f.id === selected)

  return (
    <div style={{ width: 320 }}>
      <Typeahead
        variant={args.variant}
        debounceMs={args.debounceMs}
        clearOnSelect={args.clearOnSelect}
        onSearch={handleSearch}
        onSelect={handleSelect}
      >
        <Typeahead.Input
          placeholder="Search fruits..."
          icon="MagnifyingGlass"
        />
        <Typeahead.Menu>
          {results.length > 0 ? (
            results.map((fruit, i) => (
              <Typeahead.Item key={fruit.id} value={fruit.id} index={i}>
                <span className="ui:flex ui:items-center ui:gap-2">
                  <span>{fruit.emoji}</span>
                  <Typeahead.Highlight>{fruit.label}</Typeahead.Highlight>
                </span>
              </Typeahead.Item>
            ))
          ) : (
            <Typeahead.Empty>No fruits found</Typeahead.Empty>
          )}
        </Typeahead.Menu>
      </Typeahead>
      {selectedFruit && (
        <p className="ui:mt-3 ui:text-sm ui:text-muted-foreground">
          Selected: {selectedFruit.emoji} {selectedFruit.label}
        </p>
      )}
    </div>
  )
}

export const Playground: Story = {
  args: {
    variant: 'light',
    debounceMs: 0,
    clearOnSelect: true,
  },
  render: (args) => (
    <PlaygroundComponent
      variant={args.variant}
      debounceMs={args.debounceMs}
      clearOnSelect={args.clearOnSelect}
    />
  ),
}

const ShowcaseComponent = () => {
  const [lightResults, setLightResults] = useState(allFruits)
  const [darkResults, setDarkResults] = useState(allFruits)

  const filterFruits = (query: string) =>
    query
      ? allFruits.filter((f) =>
          f.label.toLowerCase().includes(query.toLowerCase())
        )
      : allFruits

  return (
    <div className="ui:space-y-10" style={{ width: 800 }}>
      {/* Light variant */}
      <div>
        <h2 className="ui:text-xl ui:font-bold ui:mb-4">Light</h2>
        <div className="ui:grid ui:grid-cols-2 ui:gap-6">
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2">Basic</h3>
            <Typeahead
              onSearch={(q) => {
                setLightResults(filterFruits(q))
              }}
              onSelect={() => undefined}
            >
              <Typeahead.Input
                placeholder="Search fruits..."
                icon="MagnifyingGlass"
              />
              <Typeahead.Menu>
                {lightResults.map((fruit, i) => (
                  <Typeahead.Item key={fruit.id} value={fruit.id} index={i}>
                    <span className="ui:flex ui:items-center ui:gap-2">
                      <span>{fruit.emoji}</span>
                      <Typeahead.Highlight>{fruit.label}</Typeahead.Highlight>
                    </span>
                  </Typeahead.Item>
                ))}
              </Typeahead.Menu>
            </Typeahead>
          </div>
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2">
              With Disabled Items
            </h3>
            <Typeahead onSelect={() => undefined}>
              <Typeahead.Input placeholder="Search..." />
              <Typeahead.Menu>
                <Typeahead.Item index={0} value="apple">
                  Apple
                </Typeahead.Item>
                <Typeahead.Item index={1} value="banana" disabled>
                  Banana (unavailable)
                </Typeahead.Item>
                <Typeahead.Item index={2} value="cherry">
                  Cherry
                </Typeahead.Item>
                <Typeahead.Item index={3} value="grape" disabled>
                  Grape (unavailable)
                </Typeahead.Item>
                <Typeahead.Item index={4} value="mango">
                  Mango
                </Typeahead.Item>
              </Typeahead.Menu>
            </Typeahead>
          </div>
        </div>
      </div>

      {/* Dark variant */}
      <div className="ui:rounded-lg ui:bg-neutral-950 ui:p-6">
        <h2 className="ui:text-xl ui:font-bold ui:mb-4 ui:text-white">Dark</h2>
        <div className="ui:grid ui:grid-cols-2 ui:gap-6">
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2 ui:text-neutral-300">
              Basic
            </h3>
            <Typeahead
              variant="dark"
              onSearch={(q) => {
                setDarkResults(filterFruits(q))
              }}
              onSelect={() => undefined}
            >
              <Typeahead.Input
                placeholder="Search fruits..."
                icon="MagnifyingGlass"
              />
              <Typeahead.Menu>
                {darkResults.map((fruit, i) => (
                  <Typeahead.Item key={fruit.id} value={fruit.id} index={i}>
                    <span className="ui:flex ui:items-center ui:gap-2">
                      <span>{fruit.emoji}</span>
                      <Typeahead.Highlight>{fruit.label}</Typeahead.Highlight>
                    </span>
                  </Typeahead.Item>
                ))}
              </Typeahead.Menu>
            </Typeahead>
          </div>
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2 ui:text-neutral-300">
              Empty State
            </h3>
            <Typeahead variant="dark" onSelect={() => undefined}>
              <Typeahead.Input placeholder="Type anything..." />
              <Typeahead.Menu>
                <Typeahead.Empty>No results found</Typeahead.Empty>
              </Typeahead.Menu>
            </Typeahead>
          </div>
        </div>
      </div>

      {/* Sizes & features */}
      <div>
        <h2 className="ui:text-xl ui:font-bold ui:mb-4">Input Sizes</h2>
        <div className="ui:grid ui:grid-cols-3 ui:gap-6">
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2">Small</h3>
            <Typeahead onSelect={() => undefined}>
              <Typeahead.Input
                inputSize="sm"
                placeholder="Search..."
                icon="MagnifyingGlass"
              />
              <Typeahead.Menu>
                <Typeahead.Item index={0} value="1">
                  Result A
                </Typeahead.Item>
                <Typeahead.Item index={1} value="2">
                  Result B
                </Typeahead.Item>
              </Typeahead.Menu>
            </Typeahead>
          </div>
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2">
              Medium (default)
            </h3>
            <Typeahead onSelect={() => undefined}>
              <Typeahead.Input
                inputSize="md"
                placeholder="Search..."
                icon="MagnifyingGlass"
              />
              <Typeahead.Menu>
                <Typeahead.Item index={0} value="1">
                  Result A
                </Typeahead.Item>
                <Typeahead.Item index={1} value="2">
                  Result B
                </Typeahead.Item>
              </Typeahead.Menu>
            </Typeahead>
          </div>
          <div>
            <h3 className="ui:text-sm ui:font-semibold ui:mb-2">Large</h3>
            <Typeahead onSelect={() => undefined}>
              <Typeahead.Input
                inputSize="lg"
                placeholder="Search..."
                icon="MagnifyingGlass"
              />
              <Typeahead.Menu>
                <Typeahead.Item index={0} value="1">
                  Result A
                </Typeahead.Item>
                <Typeahead.Item index={1} value="2">
                  Result B
                </Typeahead.Item>
              </Typeahead.Menu>
            </Typeahead>
          </div>
        </div>
      </div>

      {/* Rich content */}
      <div>
        <h2 className="ui:text-xl ui:font-bold ui:mb-4">Rich Content Items</h2>
        <div style={{ maxWidth: 400 }}>
          <Typeahead onSelect={() => undefined}>
            <Typeahead.Input
              placeholder="Search movies..."
              icon="MagnifyingGlass"
              label="Movie Search"
            />
            <Typeahead.Menu>
              <Typeahead.Item index={0} value="278">
                <div className="ui:flex ui:items-center ui:gap-3">
                  <div className="ui:h-10 ui:w-7 ui:shrink-0 ui:rounded ui:bg-primary/20" />
                  <div>
                    <div className="ui:font-medium">
                      <Typeahead.Highlight>
                        The Shawshank Redemption
                      </Typeahead.Highlight>
                    </div>
                    <div className="ui:text-xs ui:text-muted-foreground">
                      1994 &middot; Drama
                    </div>
                  </div>
                </div>
              </Typeahead.Item>
              <Typeahead.Item index={1} value="238">
                <div className="ui:flex ui:items-center ui:gap-3">
                  <div className="ui:h-10 ui:w-7 ui:shrink-0 ui:rounded ui:bg-primary/20" />
                  <div>
                    <div className="ui:font-medium">
                      <Typeahead.Highlight>The Godfather</Typeahead.Highlight>
                    </div>
                    <div className="ui:text-xs ui:text-muted-foreground">
                      1972 &middot; Crime, Drama
                    </div>
                  </div>
                </div>
              </Typeahead.Item>
              <Typeahead.Item index={2} value="240">
                <div className="ui:flex ui:items-center ui:gap-3">
                  <div className="ui:h-10 ui:w-7 ui:shrink-0 ui:rounded ui:bg-primary/20" />
                  <div>
                    <div className="ui:font-medium">
                      <Typeahead.Highlight>
                        The Godfather Part II
                      </Typeahead.Highlight>
                    </div>
                    <div className="ui:text-xs ui:text-muted-foreground">
                      1974 &middot; Crime, Drama
                    </div>
                  </div>
                </div>
              </Typeahead.Item>
            </Typeahead.Menu>
          </Typeahead>
        </div>
      </div>
    </div>
  )
}

export const Showcase: Story = {
  render: () => <ShowcaseComponent />,
  parameters: {
    controls: { disable: true },
  },
}
