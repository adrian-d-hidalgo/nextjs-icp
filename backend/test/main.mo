import Principal "mo:base/Principal";
actor Test {
    public shared query ({ caller }) func greet(name : Text) : async Text {
        "Hi, " # Principal.toText(caller);
    };
};
