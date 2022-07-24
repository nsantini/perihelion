import { useRouter } from "next/router";
import { IconButton, Stack, Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export default function Navigation() {
  const router = useRouter();
  const { page } = router.query;
  let pageNumber = !isNaN(page) ? parseInt(page) : 1;
  const navigate = (page) => {
    router.query.page = page;
    router.push(router);
  };

  return (
    <Stack direction={"row"}>
      {pageNumber > 1 && (
        <IconButton
          icon={<ArrowLeftIcon />}
          onClick={() => navigate(pageNumber - 1)}
        />
      )}
      <Button>{pageNumber}</Button>
      <IconButton
        icon={<ArrowRightIcon onClick={() => navigate(pageNumber + 1)} />}
      />
    </Stack>
  );
}
