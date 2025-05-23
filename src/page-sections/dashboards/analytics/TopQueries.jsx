import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import LinearProgress from '@mui/material/LinearProgress';
import { nanoid } from 'nanoid'; // CUSTOM COMPONENTS

import Scrollbar from '@/components/scrollbar';
import MoreButton from '@/components/more-button';
import { Paragraph } from '@/components/typography';
import { FlexBetween, FlexBox } from '@/components/flexbox'; // CUSTOM UTILS METHOD

import { numberFormat } from '@/utils/numberFormat'; // STYLED COMPONENTS

import { BodyTableCell, HeadTableCell } from './styles'; // DUMMY DATA LIST

const DATA = [{
  id: nanoid(),
  keyword: 'Admin Dashboard',
  click: 1369,
  value: 90
}, {
  id: nanoid(),
  keyword: 'Top Admin Dashboard',
  click: 1003,
  value: 80
}, {
  id: nanoid(),
  keyword: 'Admin Panel',
  click: 1987,
  value: 95
}, {
  id: nanoid(),
  keyword: 'Analytics Dashboard',
  click: 1462,
  value: 85
}, {
  id: nanoid(),
  keyword: 'Minimal Dashboard',
  click: 986,
  value: 75
}, {
  id: nanoid(),
  keyword: 'Clean UI Template',
  click: 1028,
  value: 90
}, {
  id: nanoid(),
  keyword: 'Logistics Dashboard',
  click: 369,
  value: 87
}];
export default function TopQueries() {
  return <Card sx={{
    padding: 3,
    pb: 1
  }}>
      <FlexBetween mb={4}>
        <div>
          <Paragraph fontSize={18} fontWeight={500}>
            Top Queries
          </Paragraph>
          <Paragraph color="text.secondary">Counted in Millions</Paragraph>
        </div>

        <MoreButton size="small" />
      </FlexBetween>

      <Scrollbar>
        <Table sx={{
        minWidth: 470
      }}>
          <TableHead>
            <TableRow>
              <HeadTableCell>KEYWORDS</HeadTableCell>
              <HeadTableCell>CLICKS</HeadTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {DATA.map(item => <TableRow key={item.id}>
                <BodyTableCell sx={{
              color: 'grey.500'
            }}>{item.keyword}</BodyTableCell>

                <BodyTableCell>
                  <FlexBox alignItems="center" gap={2} minWidth={120}>
                    <Paragraph color="text.primary" fontWeight={600}>
                      {numberFormat(item.click)}
                    </Paragraph>

                    <LinearProgress value={item.value} variant="determinate" />
                  </FlexBox>
                </BodyTableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>;
}