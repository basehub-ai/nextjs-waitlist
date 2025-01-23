import { RichText, RichTextProps } from 'basehub/react-rich-text'
import {
  CodeBlock,
  CodeInline,
  dracula,
  Heading,
  Img,
  LinkProps,
  PrismLanguage,
  Tailwind,
  Text,
  TextProps,
  Link,
  Section,
  Head,
} from '@react-email/components'
import { fragmentOn } from 'basehub'

const authorFragment = fragmentOn('AuthorComponent', {
  name: true,
  role: true,
  signatureName: true,
})

const socialMediaFragment = fragmentOn('SocialLinkComponent', {
  url: true,
  _title: true,
  image: {
    url: true,
  },
})

type SocialMedia = fragmentOn.infer<typeof socialMediaFragment>

type AuthorFragment = fragmentOn.infer<typeof authorFragment>

type NewsletterEmailProps = {
  content: RichTextProps['content']
  blocks: RichTextProps['blocks']
  author?: AuthorFragment | null
  socialLinks?: SocialMedia[] | null
  address?: string | null
  unsubscribeLink?: string | null
}

function NewsletterEmail({
  content,
  blocks,
  author,
  socialLinks,
  address,
  unsubscribeLink,
}: NewsletterEmailProps) {
  return (
    <Tailwind>
      <Head>
        <style>
          {`
          ul li p,
          ol li p {
             margin-bottom: 12px !important; 
            }

          blackquote p {
            margin-block: 12px !important; 
          }
         `}
        </style>
      </Head>
      <div className="max-w-screen-md mx-auto py-8 px-2 gap-8">
        <RichText
          content={content}
          blocks={blocks}
          components={{
            ...defaultComponents,
            CalloutBoxComponent: ({ title, content }) => (
              <div className="rounded-xl p-6 mb-8 bg-gray-50">
                <h2 className="text-2xl font-medium mb-4">{title}</h2>
                <RichText
                  content={content.json.content}
                  components={defaultComponents}
                />
              </div>
            ),
          }}
        />
        <Hr />
        <div>
          {author && (
            <>
              <div className="">
                {/* cursive font */}
                <p className='font-["Brush_Script_MT",_"Brush_Script_Std",_cursive] text-3xl text-[#1C2024] mb-0 mt-0'>
                  {author.signatureName}
                </p>
                <p className="eading-relaxed font-[Helvetica,_'ui-sans-serif'] text-base font-medium mt-0 !text-xs text-[#1C2024]">
                  {author.name}, {author.role}
                </p>
              </div>
              <Hr />
            </>
          )}
          {socialLinks && (
            <Section
              style={{
                textAlign: 'left',
                padding: 0,
                margin: 0,
                marginBottom: 16,
              }}
            >
              {socialLinks
                ?.filter((item) => item.image)
                .map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#F0F0F3',
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      marginRight: 16,
                      textDecoration: 'none',
                      lineHeight: 0, // Critical for email clients
                    }}
                  >
                    {/* Centering container */}
                    <div
                      style={{
                        display: 'table',
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'table-cell',
                          verticalAlign: 'middle',
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        <Img
                          src={item.image?.url}
                          alt={item._title || 'Social icon'}
                          width={16}
                          height={16}
                          style={{
                            display: 'inline-block',
                            margin: '0 auto',
                            outline: 'none',
                            border: 'none',
                            lineHeight: 0,
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
            </Section>
          )}
          {unsubscribeLink && (
            <p className="text-xs text-[#60646C] mb-4 eading-relaxed font-[Helvetica,_'ui-sans-serif'] mt-0">
              <A href={unsubscribeLink}>Unsubscribe</A> from these emails.
            </p>
          )}
          <pre className="text-sm font-[Helvetica,_'ui-sans-serif'] !text-[#B9BBC6] block">
            {address}
          </pre>
        </div>
      </div>
    </Tailwind>
  )
}

NewsletterEmail.PreviewProps = {
  content: [
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
        caption: 'AI Generated image',
      },
    },
    {
      type: 'basehub-block',
      attrs: {
        id: '6dw6vdvm1Tqej9RceCNZw',
      },
    },
  ],
  blocks: [
    {
      __typename: 'CalloutBoxComponent',
      _id: '6dw6vdvm1Tqej9RceCNZw',
      title: 'Closing Thoughts:',
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
  author: {
    name: 'Jhon Doe',
    role: 'CEO @ Acme Corp',
    signatureName: 'J. Doe',
  },
  unsubscribeLink: 'https://basehub.ai/waitlist',
  socialLinks: [
    {
      _title: 'Linkedin',
      image: {
        url: 'https://assets.basehub.com/26ad0700/709a7ed964fa3da3d29d4dc86e1a91f7/linkedin-logo.png',
      },
      url: 'https://www.linkedin.com/company/basehubai/',
    },
    {
      _title: 'Discord',
      image: {
        url: 'https://assets.basehub.com/26ad0700/ba62e381c481c5eb17e960f5c7698a09/discord-logo.png',
      },
      url: 'https://discord.gg/6Gk4qfuqHK',
    },
    {
      _title: 'X',
      image: {
        url: 'https://assets.basehub.com/26ad0700/e36ed2f9801cd9bc72c898533f28602e/vector.png',
      },
      url: 'https://twitter.com/basehub_ai',
    },
    {
      _title: 'GitHub',
      image: {
        url: 'https://assets.basehub.com/26ad0700/4d2ceefdf0ba3071f16d871bae91761a/github-logo.png',
      },
      url: 'https://github.com/basehub-ai/nextjs-marketing-website',
    },
  ],
  address: `401 Broadway
New York, NY, 10013`,
}

const Hr = () => (
  <hr className="border-0 border-b border-solid border-[#E8E8EC] my-8" />
)

const A = (props: LinkProps) => {
  return <Link {...props} className="text-[#60646C] underline" />
}

const P = ({ children }: TextProps) => (
  <Text className="leading-relaxed font-[Helvetica,_'ui-sans-serif'] text-[#60646C] text-base mb-5">
    {children}
  </Text>
)

const defaultComponents: RichTextProps['components'] = {
  h1: ({ children }) => (
    <Heading
      as="h1"
      className="leading-none font-normal text-4xl font-[Georgia,_'ui-serif'] mt-8 mb-2 text-[#1C2024]"
    >
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading
      as="h2"
      className="leading-none font-normal font-[Georgia,_'ui-serif'] text-2xl mt-8 mb-2 text-[#1C2024]"
    >
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading
      as="h3"
      className="leading-none font-normal font-[Georgia,_'ui-serif'] text-xl mt-8 mb-2 text-[#1C2024]"
    >
      {children}
    </Heading>
  ),
  h4: ({ children }) => (
    <Heading
      as="h4"
      className="leading-none font-normal font-[Georgia,_'ui-serif'] text-xl mt-8 mb-2 text-[#1C2024]"
    >
      {children}
    </Heading>
  ),
  p: P,
  pre: ({ code, language }) => {
    return (
      <CodeBlock
        code={code}
        fontFamily="'CommitMono', monospace"
        language={language as PrismLanguage}
        theme={dracula}
      />
    )
  },
  code: ({ children }) => <CodeInline className="mb-5">{children}</CodeInline>,
  img: ({ src, alt, caption }) => (
    <figure className="mb-5 mx-0">
      <Img
        src={src}
        alt={alt}
        className="rounded-xl w-full object-cover mb-2 mx-0"
      />
      {caption && (
        <figcaption className="text-[#8B8D98] text-sm text-center mx-auto font-[Helvetica,_'ui-sans-serif']">
          {caption}
        </figcaption>
      )}
    </figure>
  ),
  b: (props) => <strong {...props} className="font-medium text-[#80838D]" />,
  blockquote: ({ ...props }) => (
    <blockquote
      {...props}
      className="border-0 pl-3 ml-0 border-l-4 border-solid border-[#E8E8EC] [&>b]:text-xs"
    />
  ),
  a: A,
  table: ({ children }) => <div className="overflow-x-auto">{children}</div>,
  thead: ({ children }) => (
    <thead className="text-left text-[#60646C] font-medium text-xs uppercase">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 border-b border-[#E8E8EC]">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 border-b border-[#E8E8EC]">{children}</td>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-[#E8E8EC]">{children}</tr>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  video: ({ children }) => <div className="overflow-hidden">{children}</div>, // not available in mail
  hr: Hr,
}

export default NewsletterEmail
