export default (editor, config) => {
  const bm = editor.BlockManager
  const toAdd = name => config.blocks.indexOf(name) >= 0

  toAdd('link-block') && bm.add('link-block', {
    category: 'Basic',
    label: 'Link Block',
    attributes: { class: 'fa fa-link' },
    content: {
      type: 'link',
      editable: false,
      droppable: true,
      style: {
        display: 'inline-block',
        padding: '5px',
        'min-height': '50px',
        'min-width': '50px'
      }
    }
  })

  toAdd('quote') && bm.add('quote', {
    label: 'Quote',
    category: 'Basic',
    attributes: { class: 'fa fa-quote-right' },
    content: `<blockquote class="quote">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit
      </blockquote>`
  })

  toAdd('text-basic') && bm.add('text-basic', {
    category: 'Basic',
    label: 'Text section',
    attributes: { class: 'gjs-fonts gjs-f-h1p' },
    content: `<section class="bdg-sect">
      <h1 class="heading">Insert title here</h1>
      <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      </section>`
  })

  toAdd('text-basic') && bm.add('h1-block', {
    label: 'Heading 1',
    content: '<h1>Put your title here</h1>',
    attributes: {
      class: 'gjs-heading',
      title: 'Insert h1 block'
    }
  })

  toAdd('text-basic') && bm.add('h2-block', {
    label: 'Heading 2',
    content: '<h2>Put your title here</h2>',
    attributes: {
      class: 'gjs-heading',
      title: 'Insert h2 block'
    }
  })

  toAdd('text-basic') && bm.add('h3-block', {
    label: 'Heading 3',
    content: '<h3>Put your title here</h3>',
    attributes: {
      class: 'gjs-heading',
      title: 'Insert h3 block'
    }
  })
}
