# CSS Grid Layout Framework

This framework is designed to quickly set up a CSS Grid Layout framework for your website and components.

# Documentation V0.1

Set up your grid layout based on these variables:

```sh
$grid-columns: 24;
$grid-rows: 3;
```

Use the following class definitions to position your elements:

```sh
- gsh-$i (grid-start-horizontal)-(desired grid position)
- gwh-$i (grid-end-horizontal)-(desired grid position)
- gsv-$i (grid-start-vertical)-(desired grid position)
- ghv-$i (grid-end-vertical)-(desired grid position)
```

Or optionally, Make a responsive layout:
```sh
- gsh-$br-$i (grid-start-horizontal)-(breakpoint)-(desired grid position)
- gwh-$br-$i (grid-start-horizontal)-(breakpoint)-(desired grid position)
- gsv-$br-$i (grid-start-horizontal)-(breakpoint)-(desired grid position)
- ghv-$br-$i (grid-start-horizontal)-(breakpoint)-(desired grid position)
```

# Coming soon

- component sized grid layout examples
- ??