const defaultLimitMax: number = 100;

const defaultPaginationOptions: any = {
    page: 1,
    limit: 10,
    order: null,
};

export const genPaginationOrder = (paginationOptions: any) => {
    const { page, limit, order, ...more } = Object.assign({},
      defaultPaginationOptions, paginationOptions);
    // TODO: stop relying on offset
    // https://use-the-index-luke.com/no-offset
    const newPage = page < 1 ? 1 : page;

    const newLimit = limit > defaultLimitMax ? defaultLimitMax : limit;

    const offset = newLimit * (newPage - 1);
    return {
      page: newPage,
      limit: newLimit,
      order,
      offset,
    };
};
