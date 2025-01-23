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
  Row,
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
      <div className="max-w-screen-md mx-auto py-8 gap-8">
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
              <div className="mb-8">
                {/* cursive font */}
                <P className='font-["Brush_Script_MT",_"Brush_Script_Std",_cursive] text-xl'>
                  {author.signatureName}
                </P>
                <P className="font-medium mt-0">
                  {author.name}–{author.role}
                </P>
              </div>
              <Hr />
            </>
          )}
          {socialLinks && (
            <Row>
              {socialLinks
                .filter((item) => item.image)
                .map((item) => (
                  <Link
                    href={item.url}
                    className="mb-4 w-4 h-4 p-2 bg-[#F0F0F3)] flex justify-center rounded-full"
                  >
                    <Img src={item.image!.url} />
                  </Link>
                ))}
            </Row>
          )}
          {unsubscribeLink && (
            <p className="text-xs text-[#60646C] mb-4">
              <A href={unsubscribeLink}>Unsubscribe</A> from these emails
            </p>
          )}
          <pre className="text-sm !text-[#B9BBC6] whitespace-pre-line block">
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
      icon: '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">\n<rect width="16" height="16" transform="translate(0 0.228027)" fill="white" fill-opacity="0.01"/>\n<path fill-rule="evenodd" clip-rule="evenodd" d="M2.13332 1.29468C1.54422 1.29468 1.06665 1.77225 1.06665 2.36134V14.0947C1.06665 14.6838 1.54422 15.1613 2.13332 15.1613H13.8667C14.4558 15.1613 14.9333 14.6838 14.9333 14.0947V2.36134C14.9333 1.77225 14.4558 1.29468 13.8667 1.29468H2.13332ZM3.25332 6.62801H5.27998V13.028H3.25332V6.62801ZM5.41332 4.50001C5.41332 5.1333 4.89994 5.64668 4.26665 5.64668C3.63337 5.64668 3.11998 5.1333 3.11998 4.50001C3.11998 3.86672 3.63337 3.35334 4.26665 3.35334C4.89994 3.35334 5.41332 3.86672 5.41332 4.50001ZM12.8 9.14228C12.8 7.2169 11.5556 6.46836 10.3194 6.46836C9.91467 6.44842 9.51167 6.53328 9.15064 6.71449C8.87649 6.85209 8.58948 7.16692 8.36816 7.71444H8.31123V6.62848H6.39998V13.033H8.43322V9.62663C8.40382 9.27775 8.51547 8.82686 8.74389 8.55854C8.97231 8.29022 9.29907 8.22614 9.54681 8.1936H9.62407C10.2706 8.1936 10.7505 8.59389 10.7505 9.6026V13.033H12.7837L12.8 9.14228Z" fill="currentColor"/>\n</svg>\n',
      url: 'https://www.linkedin.com/company/basehubai/',
    },
    {
      _title: 'Discord',
      icon: '<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">\n<rect width="16" height="16" transform="translate(0 0.228027)" fill="white" fill-opacity="0.01"/>\n<mask id="mask0_12905_13437" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">\n<path d="M0 0.228027H16V16.228H0V0.228027Z" fill="currentColor"/>\n</mask>\n<g mask="url(#mask0_12905_13437)">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M5.41617 2.15441C5.36968 2.14711 5.32243 2.14599 5.27563 2.15109C4.37495 2.24918 3.00684 2.73437 2.19911 3.17246C2.14345 3.20265 2.09362 3.24251 2.05193 3.29017C1.71479 3.67564 1.41017 4.30333 1.1718 4.89393C0.926519 5.50165 0.723379 6.14212 0.607553 6.6052C0.230863 8.11125 0.0240737 9.91941 -0.00262083 11.6329C-0.00401176 11.7222 0.0170386 11.8104 0.0585995 11.8895C0.382514 12.5055 1.07619 13.0744 1.76838 13.4892C2.46869 13.9087 3.28674 14.2415 3.94877 14.3055C4.11488 14.3215 4.27892 14.2589 4.39207 14.1362C4.55824 13.956 4.83891 13.5377 5.04985 13.2149C5.16218 13.043 5.2661 12.8803 5.34183 12.7607C5.347 12.7526 5.35204 12.7446 5.35694 12.7368C6.07416 12.9093 6.94966 13.028 8.00007 13.028C9.04936 13.028 9.92411 12.9095 10.6409 12.7374C10.6457 12.7449 10.6506 12.7527 10.6557 12.7607C10.7314 12.8803 10.8354 13.043 10.9477 13.2149C11.1586 13.5377 11.4393 13.956 11.6054 14.1362C11.7186 14.2589 11.8826 14.3215 12.0487 14.3055C12.7108 14.2415 13.5288 13.9087 14.2292 13.4892C14.9213 13.0744 15.615 12.5055 15.9389 11.8895C15.9804 11.8104 16.0015 11.7222 16.0002 11.6329C15.9734 9.91941 15.7667 8.11125 15.3899 6.6052C15.2741 6.14212 15.071 5.50165 14.8256 4.89393C14.5874 4.30333 14.2827 3.67564 13.9455 3.29017C13.9038 3.24251 13.854 3.20265 13.7983 3.17246C12.9907 2.73437 11.6226 2.24918 10.7219 2.15109C10.675 2.14599 10.6278 2.14711 10.5813 2.15441C10.3563 2.18977 10.1635 2.30553 10.0225 2.41203C9.87339 2.52465 9.73524 2.66305 9.61624 2.8027C9.44209 3.00709 9.27319 3.2569 9.16543 3.49371C8.80204 3.45221 8.413 3.42793 8.00005 3.42793C7.58617 3.42793 7.19628 3.45231 6.83219 3.49399C6.72443 3.2571 6.55547 3.00716 6.38125 2.8027C6.26226 2.66305 6.1241 2.52465 5.97501 2.41203C5.83403 2.30553 5.64121 2.18977 5.41617 2.15441ZM11.6972 12.41C11.7421 12.4799 11.7906 12.5548 11.8406 12.6314C11.9794 12.8438 12.1162 13.0469 12.2233 13.1969C12.6412 13.1007 13.1711 12.8796 13.6809 12.5742C14.2566 12.2292 14.7104 11.8343 14.9308 11.5007C14.8957 9.89717 14.6976 8.23333 14.3551 6.86402C14.2517 6.45019 14.0639 5.85659 13.8365 5.29317C13.6232 4.76463 13.397 4.319 13.1999 4.06251C12.5099 3.70576 11.4274 3.32925 10.7195 3.22599C10.7055 3.23447 10.6875 3.24644 10.6654 3.26314C10.5943 3.31685 10.5118 3.39637 10.4281 3.49452C10.3727 3.55958 10.3234 3.62485 10.281 3.6866C10.6731 3.7783 11.0192 3.8856 11.3157 3.99337C11.7066 4.13555 12.0115 4.2787 12.2217 4.38842C12.327 4.4433 12.4086 4.48988 12.4658 4.52391C12.4942 4.54092 12.5167 4.55481 12.5328 4.56503L12.5525 4.57754L12.5587 4.58161L12.5609 4.58309L12.5619 4.58367C12.5621 4.58379 12.5625 4.58416 12.2824 5.00442L12.5619 4.58367C12.8069 4.74705 12.8739 5.07869 12.7104 5.32377C12.5474 5.56838 12.2172 5.63482 11.9723 5.47262L11.9712 5.47192C11.9711 5.47181 11.9708 5.47168 12.2667 5.02793L11.9712 5.47192L11.9632 5.46687C11.9547 5.46147 11.9402 5.45243 11.9198 5.44028C11.879 5.41597 11.8149 5.37923 11.7284 5.33411C11.5554 5.24382 11.2935 5.12031 10.9511 4.99582C10.2664 4.74685 9.26163 4.4946 8.00005 4.4946C6.73847 4.4946 5.73365 4.74685 5.04898 4.99582C4.70661 5.12031 4.44478 5.24382 4.27175 5.33411C4.18528 5.37923 4.12112 5.41597 4.0803 5.44028C4.05991 5.45243 4.04536 5.46147 4.0368 5.46687L4.02846 5.4722C4.02837 5.47226 4.02856 5.47213 4.02846 5.4722C3.78344 5.63508 3.45288 5.56865 3.28963 5.32377C3.12624 5.07869 3.19245 4.74756 3.43754 4.58417L3.73338 5.02793C3.43754 4.58417 3.43736 4.58429 3.43754 4.58417L3.43917 4.58309L3.4414 4.58161L3.44764 4.57754L3.46721 4.56503C3.48338 4.55481 3.50582 4.54092 3.53437 4.52391C3.59148 4.48988 3.67316 4.4433 3.77834 4.38842C3.98865 4.2787 4.29349 4.13555 4.68444 3.99337C4.98025 3.88581 5.32564 3.77871 5.71682 3.68712C5.67436 3.62522 5.62496 3.55976 5.56936 3.49452C5.48572 3.39637 5.40315 3.31685 5.33205 3.26314C5.30994 3.24644 5.29191 3.23447 5.27795 3.22599C4.57017 3.32925 3.48754 3.70576 2.79756 4.06251C2.60053 4.319 2.37426 4.76463 2.16093 5.29317C1.93353 5.85659 1.74585 6.45019 1.64234 6.86402C1.29986 8.23333 1.10174 9.89717 1.0667 11.5007C1.28702 11.8343 1.7409 12.2292 2.31659 12.5742C2.82634 12.8796 3.35623 13.1007 3.77421 13.1969C3.88129 13.0469 4.01814 12.8438 4.1569 12.6314C4.20717 12.5544 4.25579 12.4793 4.30086 12.4092C4.19933 12.3697 4.10297 12.3297 4.01166 12.2895C3.58456 12.1012 3.27069 11.9103 3.05844 11.7611C2.95237 11.6866 2.87181 11.6226 2.81528 11.5747C2.78701 11.5508 2.76475 11.5309 2.74832 11.5157C2.7401 11.5081 2.73334 11.5017 2.72801 11.4966L2.72108 11.4899L2.71842 11.4873L2.71729 11.4862C2.71704 11.486 2.71628 11.4852 3.0934 11.108L2.71628 11.4852C2.50801 11.2769 2.50801 10.9392 2.71628 10.7309C2.92347 10.5237 3.25869 10.5227 3.46723 10.7277L3.47136 10.7315C3.47696 10.7367 3.48793 10.7466 3.50445 10.7606C3.5375 10.7886 3.59278 10.8329 3.67171 10.8884C3.82946 10.9992 4.08225 11.1549 4.44181 11.3134C5.15908 11.6294 6.31233 11.9614 8.00007 11.9614C9.68782 11.9614 10.8411 11.6294 11.5583 11.3134C11.9179 11.1549 12.1707 10.9992 12.3285 10.8884C12.4074 10.8329 12.4627 10.7885 12.4957 10.7606C12.5123 10.7466 12.5232 10.7367 12.5288 10.7315L12.533 10.7277C12.7415 10.5227 13.0766 10.5237 13.2839 10.7309C13.4921 10.9392 13.4921 11.2769 13.2839 11.4852L12.912 11.1134C13.2839 11.4852 13.2842 11.485 13.2839 11.4852L13.2828 11.4862L13.2818 11.4873L13.2791 11.4899L13.2722 11.4966C13.2668 11.5017 13.2601 11.5081 13.2518 11.5157C13.2354 11.5309 13.2132 11.5508 13.1849 11.5747C13.1284 11.6226 13.0478 11.6866 12.9417 11.7611C12.7294 11.9103 12.4156 12.1012 11.9885 12.2895C11.8966 12.33 11.7995 12.3703 11.6972 12.41ZM4.35257 7.70762C4.61244 7.42776 4.96513 7.26966 5.33346 7.26791C5.70179 7.26966 6.05448 7.42776 6.31435 7.70762C6.57422 7.98749 6.72012 8.36632 6.72012 8.76124C6.72012 9.15615 6.57422 9.53498 6.31435 9.81485C6.05448 10.0947 5.70179 10.2528 5.33346 10.2546C4.96513 10.2528 4.61244 10.0947 4.35257 9.81485C4.09269 9.53498 3.94679 9.15615 3.94679 8.76124C3.94679 8.36632 4.09269 7.98749 4.35257 7.70762ZM10.6655 7.26791C10.2972 7.26966 9.94448 7.42776 9.68459 7.70762C9.42472 7.98749 9.27882 8.36632 9.27882 8.76124C9.27882 9.15615 9.42472 9.53498 9.68459 9.81485C9.94448 10.0947 10.2972 10.2528 10.6655 10.2546C11.0339 10.2528 11.3865 10.0947 11.6463 9.81485C11.9063 9.53498 12.0522 9.15615 12.0522 8.76124C12.0522 8.36632 11.9063 7.98749 11.6463 7.70762C11.3865 7.42776 11.0339 7.26966 10.6655 7.26791Z" fill="currentColor"/>\n</g>\n</svg>\n',
      url: 'https://discord.gg/6Gk4qfuqHK',
    },
    {
      _title: 'X',
      icon: '<svg viewBox="0 0 128 128">\n  <path d="M75.916 54.2 122.542 0h-11.05L71.008 47.06 38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303 89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086-39.42-56.386h16.972L65.19 53.824l4.954 7.086 41.353 59.15h-16.97L60.782 71.793Z" fill="currentColor" style="stroke-width:.104373"></path>\n</svg>',
      url: 'https://twitter.com/basehub_ai',
    },
    {
      _title: 'GitHub',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">\n  <rect width="16" height="16" transform="translate(0 0.228027)" fill="white" fill-opacity="0.01"/>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99922 0.494629C3.72937 0.494629 0.266602 3.95695 0.266602 8.22822C0.266602 11.6445 2.48223 14.5433 5.55524 15.5663C5.94216 15.637 6.08316 15.3983 6.08316 15.1932C6.08316 15.0094 6.07651 14.5233 6.07271 13.8781C3.92165 14.3453 3.4678 12.8413 3.4678 12.8413C3.11601 11.9479 2.60899 11.71 2.60899 11.71C1.90685 11.2305 2.66216 11.24 2.66216 11.24C3.43837 11.2946 3.84664 12.0371 3.84664 12.0371C4.53645 13.2187 5.65684 12.8773 6.09741 12.6794C6.16767 12.18 6.36753 11.8391 6.58829 11.6459C4.87113 11.4503 3.06569 10.7871 3.06569 7.82374C3.06569 6.97916 3.36716 6.28937 3.86183 5.74863C3.78208 5.55304 3.5167 4.76685 3.93779 3.702C3.93779 3.702 4.58676 3.49405 6.06417 4.49434C6.68086 4.32296 7.34265 4.23751 8.00017 4.23418C8.65721 4.23751 9.31854 4.32296 9.93618 4.49434C11.4126 3.49405 12.0606 3.702 12.0606 3.702C12.4827 4.76685 12.2173 5.55304 12.1381 5.74863C12.6336 6.28937 12.9327 6.97916 12.9327 7.82374C12.9327 10.7947 11.1244 11.4484 9.40209 11.6397C9.67934 11.8785 9.92669 12.3504 9.92669 13.072C9.92669 14.1055 9.91718 14.9396 9.91718 15.1932C9.91718 15.4001 10.0568 15.6409 10.4489 15.5654C13.5195 14.5404 15.7333 11.644 15.7333 8.22822C15.7333 3.95695 12.2704 0.494629 7.99922 0.494629Z" fill="currentColor"/>\n</svg>',
      url: 'https://github.com/basehub-ai/nextjs-marketing-website',
    },
  ],
  address: `401 Broadway
New York, NY, 10013`,
}

export default NewsletterEmail

const Hr = () => (
  <hr className="border-0 border-b border-solid border-[#E8E8EC]" />
)

const A = (props: LinkProps) => {
  return <Link {...props} className="text-[#60646C] underline" />
}

const P = ({ children, className }: TextProps) => (
  <Text
    className={`leading-relaxed font-[Helvetica,_'ui-sans-serif'] text-[#60646C] text-base ${className}`}
  >
    {children}
  </Text>
)

const defaultComponents: RichTextProps['components'] = {
  h1: ({ children }) => (
    <Heading
      as="h1"
      className="leading-none text-4xl font-[Georgia,_'ui-serif'] mb-2 text-[#1C2024]"
    >
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading
      as="h2"
      className="leading-none font-[Georgia,_'ui-serif'] text-2xl mb-2 text-[#1C2024]"
    >
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading
      as="h3"
      className="leading-none font-[Georgia,_'ui-serif'] text-xl mb-2 text-[#1C2024]"
    >
      {children}
    </Heading>
  ),
  h4: ({ children }) => (
    <Heading
      as="h4"
      className="leading-none font-[Georgia,_'ui-serif'] text-xl mb-2 text-[#1C2024]"
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
  code: ({ children }) => <CodeInline>{children}</CodeInline>,
  img: ({ src, alt, caption }) => (
    <figure className="mb-8">
      <Img
        src={src}
        alt={alt}
        className="rounded-xl w-full object-cover mb-2"
      />
      {caption && (
        <figcaption className="text-gray-400 text-sm text-center mx-auto">
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
