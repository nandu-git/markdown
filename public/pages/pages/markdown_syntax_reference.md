# Markdown Syntax Reference

This document provides a quick reference for common Markdown syntax.

# | 5223 | Rishyashringa |

## Baala Kaanda


## Headings

```markdown
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading
```

## Paragraphs

Just type your text. Newlines are created by leaving a blank line between paragraphs.

```markdown
This is a paragraph.

This is another paragraph.
```

## Emphasis

```markdown
*Italic text* or _Italic text_
**Bold text** or __Bold text__
***Bold and Italic text***
~~Strikethrough text~~
```

## Lists

### Unordered List

```markdown
* Item 1
* Item 2
  * Nested Item 2.1
  * Nested Item 2.2
* Item 3
```

### Ordered List

```markdown
1. First item
2. Second item
   1. Nested ordered item
   2. Another nested item
3. Third item
```

## Links

```markdown
[Link Text](https://www.example.com)
[Link with Title](https://www.example.com "Optional Title")
```

## Images

```markdown
![Alt text for image](images/sample_image.png "Optional Title")
```

## Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
>> Nested blockquote
```

## Code

### Inline Code

```markdown
This is `inline code`.
```

### Code Blocks

```markdown
```javascript
// This is a code block
function greet(name) {
  console.log(`Hello, ${name}!`);
}
greet("World");
```
```

## Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1 Col 1 | Row 1 Col 2 | Row 1 Col 3 |
| Row 2 Col 1 | Row 2 Col 2 | Row 2 Col 3 |
```

## Horizontal Rule

```markdown
---
***
___
