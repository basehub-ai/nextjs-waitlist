import { RichText, RichTextProps } from 'basehub/react-rich-text';
import { Font, Head, Tailwind, TailwindConfig } from '@react-email/components';
import config from '../../tailwind.config';

function NewsletterEmail({ json, blocks }: { json: RichTextProps['content']; blocks: RichTextProps['blocks'] }) {
  return (
    <Tailwind config={config as TailwindConfig}>
      <Head>
        <Font
          fontFamily="Geist"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <div className="max-w-screen-md mx-auto py-8">
        <RichText
          content={json}
          blocks={blocks}
          components={{
            ...defaultComponents,
            CalloutBoxComponent: ({ title, content }) => (
              <div className="bg-slate-1 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-medium mb-4">{title}</h2>
                <RichText content={content.json.content} components={defaultComponents} />
              </div>
            ),
          }}
        />
      </div>
    </Tailwind>
  );
}

NewsletterEmail.PreviewProps = {
  json: [
    {
      type: 'image',
      attrs: {
        src: 'https://assets.basehub.com/26ad0700/e61c3a1d6910896629c5cddfc7f1dee5/image',
        alt: '',
        width: 1040,
        height: 528,
        aspectRatio: '65/33',
      },
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
        id: 'design--development-the-perfect-recipe-for-product-success',
      },
      content: [
        {
          type: 'text',
          text: 'Design + Development: The Perfect Recipe for Product Success',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Combining design and development isn’t just a trend—it’s a proven approach to creating impactful, user-focused products. As a Senior Developer at BaseHub, I’ve seen how a collaborative process bridges gaps, streamlines workflows, and delivers results that delight users and stakeholders alike. Let’s dive into the synergy of design and development to uncover how this powerful duo drives success.',
        },
      ],
    },
    {
      type: 'horizontalRule',
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
        id: '1-why-collaboration-matters',
      },
      content: [
        {
          type: 'text',
          text: '1. Why Collaboration Matters',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'When designers and developers work in silos, miscommunication and mismatched priorities are inevitable. Collaboration ensures a shared vision, where design principles meet technical feasibility. The result? A seamless product experience that’s both beautiful and functional.',
        },
      ],
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Great things in business are never done by one person; they’re done by a team of people.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '— Steve Jobs',
              marks: [
                {
                  type: 'bold',
                  attrs: {},
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
        id: '2-aligning-goals-from-day-one',
      },
      content: [
        {
          type: 'text',
          text: '2. Aligning Goals from Day One',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'The best projects start with everyone on the same page. By involving developers early in the design phase, potential technical challenges are identified before they become roadblocks. Similarly, developers gain insight into the user experience goals, creating a product that truly aligns with its vision.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 4,
        id: 'key-practices-to-align-goals',
      },
      content: [
        {
          type: 'text',
          text: 'Key Practices to Align Goals:',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
        id: '3-tools-that-bridge-the-gap',
      },
      content: [
        {
          type: 'text',
          text: '3. Tools That Bridge the Gap',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Modern tools like Figma, BaseHub, and GitHub make collaboration easier than ever. Designers can create interactive prototypes that developers can directly translate into code. These tools reduce back-and-forth communication, saving time and enhancing clarity.',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://assets.basehub.com/26ad0700/f6cfb62126ac4b1322be72df72c4c2c7/image',
        alt: '',
        width: 1040,
        height: 520,
        aspectRatio: '2/1',
      },
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
        id: '4-feedback-loops-the-secret-ingredient',
      },
      content: [
        {
          type: 'text',
          text: '4. Feedback Loops: The Secret Ingredient',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Frequent feedback loops between design and development teams refine the product throughout the process. Instead of waiting for a final product to critique, teams can iterate on smaller milestones, ensuring alignment and adaptability.',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://assets.basehub.com/26ad0700/5d3641ba6b711defd300b0bc399e327d/image',
        alt: '',
        width: 1040,
        height: 600,
        aspectRatio: '26/15',
      },
    },
    {
      type: 'horizontalRule',
    },
    {
      type: 'basehub-block',
      attrs: {
        id: '6dw6vdvm1Tqej9RceCNZw',
      },
    },
    {
      type: 'paragraph',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '<Signature>',
        },
      ],
    },
    {
      type: 'horizontalRule',
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: '<Footer>',
        },
      ],
    },
  ],
  blocks: [
    {
      __typename: 'CalloutBoxComponent',
      content: {
        json: {
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: "Success in the digital world comes from collaboration, not competition, between design and development. When both teams respect and understand each other's craft, the synergy transforms ideas into products that users love.",
                },
              ],
            },
          ],
        },
      },
    },
  ],
};

export default NewsletterEmail;

const defaultComponents: RichTextProps['components'] = {
  h1: ({ children }) => <h1 className="text-4xl font-serif mb-6">{children}</h1>,
  h2: ({ children }) => <h2 className="text-3xl font-medium text-gray-600 mb-8">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-medium mb-4">{children}</h3>,
  h4: ({ children }) => <h4 className="text-xl font-medium mb-4">{children}</h4>,
  p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
  // Imágenes
  img: ({ src, alt }) => <img src={src} alt={alt} className="rounded-xl w-full object-cover mb-8" />,
  // Links (como los del footer)
  a: ({ href, children }) => (
    <a href={href} className="text-gray-400 hover:text-gray-600 transition-colors">
      {children}
    </a>
  ),
};
