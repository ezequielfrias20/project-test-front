export class EndpointConfig {

  URL_DEV = 'https://PrismaTest.prismadigdev.repl.co';
  

  headerToken() {
    // const token = window.localStorage.getItem('accessToken');
    const headersList = {
      Accept: '*/*',
      // Authorization: `Bearer ${token}`,
    };
    return headersList;
  }
}

