pragma solidity ^0.5.0;

// import "../erc721.sol";

contract NEPSETMS {

    address payable owner;
    // token tokencontract;


    struct Event {
        string stock_name;
        
        string website;
        
        uint256 totalbuy;
        uint256 totalsell;
        uint256 totalshares;
        uint256 SHARE_PRICE;
        uint256 sales;
        mapping(address => uint256) portfolio;
        bool isOpen;
    }
    Event myEvent;

   

    
    event LogBuyers(address buyer, uint256 quantity);
    event LogSellers(address seller, uint256 quantity);
    event LogTransactions(address owner, uint256 balance);
    


    modifier OnlyOwner {
        require(owner == msg.sender, "Required to be an owner");
        _;
    }
    


    constructor() public
    {
        owner = msg.sender;
        myEvent.stock_name = "NLIC";
        myEvent.website = "www.NLIC.com";
        myEvent.totalshares = 1000000;
        myEvent.SHARE_PRICE = 1;
        myEvent.isOpen = true;
        
    }


    function readEvent()
        public
        view
        returns(string memory description, string memory website, uint totalshares,uint sales, bool isOpen)
    {
        description = myEvent.stock_name;
        website = myEvent.website;
        totalshares = myEvent.totalshares;
        sales = myEvent.sales;
        isOpen = myEvent.isOpen;

        return (description, website, totalshares, sales, isOpen);

    }
    
    
    function PortfolioValue(address ad)
        public
        view
        returns(uint256 Value)
    {
        
        Value = myEvent.SHARE_PRICE * myEvent.portfolio[ad];

        return (Value);

    }



    function buyShares(uint256 _share) public payable returns (bool) {
        require(myEvent.isOpen == true, "Sorry,Time is not for transaction");
        uint256 amount = _share * myEvent.SHARE_PRICE;
        require(msg.value >= amount, "Amount not sufficient");
        myEvent.portfolio[tx.origin] += _share;
        myEvent.sales += _share;
        myEvent.totalbuy += _share;

        if (msg.value > amount) {
            uint256 surplus = msg.value - amount;
            tx.origin.transfer(surplus);
        }

        emit LogBuyers(tx.origin, _share);
        return true;
    }


    function sharecount(uint256 ipo)
        public
        payable
        returns(uint)
        {





        myEvent.portfolio[tx.origin] += ipo;

        return (ipo);

    }

    function IPO_apply(address ad)
        public
        view
        returns(uint)
        {

        return (myEvent.portfolio[ad]);

    }
    

    
    function applyforipo(address IP) 
        public payable returns (bool) {
        myEvent.portfolio[IP] = 10;
        return true;
    }


    function sellShares(uint256 _share) public payable returns (bool) {
        require(myEvent.isOpen == true, "Sorry,Time is not for transaction");
        uint256 amount = _share * myEvent.SHARE_PRICE;
        myEvent.portfolio[tx.origin] -= _share;
        myEvent.sales += _share;
        myEvent.totalsell += _share;
        msg.sender.transfer(amount);
        emit LogSellers(tx.origin, _share);
        return true;
    }

    






    function SEBON() public OnlyOwner payable returns (string memory) {

        require(owner == msg.sender, "Required to be an owner");
        myEvent.isOpen = false;
        //owner.transfer(myEvent.sales * myEvent.SHARE_PRICE);

        //emit LogTransactions(owner, myEvent.sales * myEvent.SHARE_PRICE);
        return "3pm";
    }
}
