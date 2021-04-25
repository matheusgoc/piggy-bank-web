import { Box, Divider } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

interface TransactionListItemSkeletonProps {
  total: number
}

const TransactionListItemSkeleton = ({total}: TransactionListItemSkeletonProps) => {
  return (
    <>
      {Array(total).fill('skeleton').map((value, index) => (
        <Box key={index}>
          <Box
            display="flex"
            alignItems="center"
            p={1}>
            <Skeleton
              variant="circle"
              width={40}
              height={40}
            />
            <Box width="70%" ml={1}>
              <Skeleton animation="wave" width={'60%'} />
              <Skeleton animation="wave" width={'80%'} />
            </Box>
            <Box width="15%" ml={1}>
              <Skeleton animation="wave" width={'100%'} />
              <Skeleton animation="wave" width={'80%'} />
            </Box>
          </Box>
          <Divider />
        </Box>
      ))}
    </>
  )
}

export default TransactionListItemSkeleton