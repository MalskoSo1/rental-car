interface AddressDetails {
  city: string;
  country: string;
}

export const formatAddress = (address: string | undefined): AddressDetails => {
  if (!address) {
    return {
      city: "",
      country: "",
    };
  }
  const arr = address.split(", ");

  if (arr.length === 3) {
    return {
      city: arr[1],
      country: arr[2],
    };
  } else if (arr.length === 2) {
    return {
      city: arr[0],
      country: arr[1],
    };
  } else {
    return {
      city: arr[0],
      country: "",
    };
  }
};
