function Error({ status, message }) {
  return (
    <>
      <h1>Error</h1>
      <div>
        <p>Status: {status}</p>
        <p>{message}</p>
      </div>
    </>
  );
}

export default Error;
