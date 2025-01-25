import Card from '@mui/material/Card'; // CUSTOM COMPONENTS

import MoreButton from '@/components/more-button';
import { H6, Paragraph } from '@/components/typography';
import FlexBetween from '@/components/flexbox/FlexBetween';
export default function Summery() {
  return <Card className="p-3">
      <FlexBetween>
        <H6 fontSize={16}>Sobre mi</H6>
        <MoreButton size="small" />
      </FlexBetween>

      <Paragraph color="text.secondary" mt={2} fontWeight={400}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas deserunt sed nesciunt tenetur mollitia ipsa quod reprehenderit aut qui ipsam esse itaque harum eius sunt, iusto sapiente autem accusantium! Voluptates.
        <br />
        <br />
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum ipsa voluptas illum cumque recusandae. Reiciendis nostrum vero error mollitia nemo ad quae, eveniet nobis nulla, tempora, aperiam non veritatis aliquid.
      </Paragraph>
    </Card>;
}