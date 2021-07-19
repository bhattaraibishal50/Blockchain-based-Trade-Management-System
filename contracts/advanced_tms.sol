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
    


    constructor(string memory stock_name, string memory _url, uint256 totalshares,uint256 SHARE_PRICE) public
    {
        owner = msg.sender;
        myEvent.stock_name = stock_name;
        myEvent.website = _url;
        myEvent.totalshares = totalshares;
        myEvent.SHARE_PRICE = SHARE_PRICE;
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
        returns(uint Value)
    {
        
        Value = myEvent.SHARE_PRICE * myEvent.portfolio[ad];

        return (Value);

    }
    
        function MarketDepth()
        external
        view
        returns(uint256[] memory)
    {
        
        
        return buyers;

    }

     function sharecount(address ad)
        public
        view
        returns(uint)
    {

        return (myEvent.portfolio[ad]);

    }
    

    uint256[] buyers;
    uint256[] sellers;
    address payable [] buyersAddress;
    address payable [] sellersAddress;
    uint256 buyersCount=0;
    
    function buyShares(uint256 _share) public payable returns (bool) {
        require(myEvent.isOpen == true, "Sorry,Time is not for transaction");
        uint256 amount = _share * myEvent.SHARE_PRICE;
        require(msg.value >= amount, "Amount not sufficient");
        buyers.push(_share);
        buyersAddress.push(msg.sender);
        buyability(_share);
       
        
    }
    
    function buyability(uint256 _share ) public payable  returns (bool) {

        uint256 sell = sellers[0];
        uint256 temp = 0;
        uint sum =0;
        for (uint i = 0; i<sellers.length; i++){
            sum = sum + sellers[0];
        }
        require(sum>=_share,"Not enough sellers, will be bought when enough sellers found.");
        while (_share>=0) {
            uint transact = 0;
            _share=_share-sell;
            transact = sell;
            sellersAddress[0].transfer(transact* myEvent.SHARE_PRICE);
            delete sellers[0];
            delete sellersAddress[0];
            sell = sellers[0];
            
            myEvent.portfolio[sellersAddress[0]]-= transact;
            temp= temp + transact;
            
            
        }
        myEvent.sales += temp;
        myEvent.totalbuy += temp;
        uint256 amount = temp* myEvent.SHARE_PRICE;

        if (msg.value > amount) {
            uint256 surplus = msg.value - amount;
            msg.sender.transfer(surplus);
        }
        delete buyers[0];
        delete buyersAddress[0];
        myEvent.portfolio[msg.sender] -= temp;
        

        emit LogBuyers(msg.sender, temp);
        return true;
        
    }
    
    function sellShares(uint256 _share) public payable returns (string memory) {
        require(myEvent.isOpen == true, "Sorry,Time is not for transaction");
        uint256 amount = _share * myEvent.SHARE_PRICE;
        require(msg.value >= amount, "Amount not sufficient");
        sellers.push(_share);
        sellersAddress.push(msg.sender);
        sellability(_share);
        

        
    }
    
    function sellability(uint256 _share ) public payable  returns (bool) {

        uint256 buy = buyers[0];
        uint256 temp = 0;
        uint sum =0;
        for (uint i = 0; i<buyers.length; i++){
            sum = sum + buyers[0];
        }
        require(sum>=_share,"Not enough buyers, will be sold when enough buyers found.");
        while (_share>=0) {
            uint transact = 0;
            _share=_share-buy;
            transact = buy;
            myEvent.portfolio[buyersAddress[0]] += temp;
            delete buyers[0];
            delete buyersAddress[0];
            
            msg.sender.transfer(transact* myEvent.SHARE_PRICE);
            temp= temp + transact;
            
            
        }
        myEvent.sales += temp;
        myEvent.totalbuy += temp;
        myEvent.portfolio[msg.sender] -= temp;

        
        delete sellers[0];
        delete sellersAddress[0];

        emit LogSellers(msg.sender, temp);
        return true;
        
    }
    
    function allocate(address IPO) public payable returns(string memory){
        require(owner == msg.sender, "Required to be an owner");
        myEvent.portfolio[IPO] = 10;
        }




    function SEBON() public OnlyOwner payable returns (string memory) {
        myEvent.isOpen = false;
        owner.transfer(myEvent.sales * myEvent.SHARE_PRICE);

        emit LogTransactions(owner, myEvent.sales * myEvent.SHARE_PRICE);
        return "3pm";
    }
}
