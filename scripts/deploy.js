const {ethers} = require('hardhat');
/** This is a function used to deploy contract */
const hre = require('hardhat');

async function main() {
  const NFTContract = await hre.ethers.getContractFactory('NFTContract');
  const _NFTContract = await NFTContract.deploy();
  console.log(
      'NFTContract deployed to:',
      _NFTContract.address,
  );
}

main().
    then(() => process.exit(0)).
    catch((error) => {
      console.error(error);
      process.exit(1);
    });