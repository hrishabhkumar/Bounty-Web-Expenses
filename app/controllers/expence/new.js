import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this.set('person',  this.store.findAll('person'));
    this.set('expence',  Ember.Object.create());
  },
  isValid     : function(expence)
                {
                    var isValid = true;

                    ['date', 'amount', 'payee', 'paidTo', 'description'].forEach(function(field) {
                        if (!expence[field])
                        {
                          isValid = false;
                          return isValid;
                        }
                    });
                    return isValid;
                  },
  actions      :  {
                      addExpences : function()
                                    {
                                      var expence = this.get('expence');

                                      expence = this.store.createRecord('expence',  {
                                                      date            : this.get('date'),
                                                      amount          : this.get('amount'),
                                                      payee           : this.get('payee'),
                                                      description     : this.get('description'),
                                                      paidTo          : expence.paidTo
                                                    });

                                      if(!this.isValid(expence)){return;}
                                      var _this = this;
                                      expence.save().then(function(){
                                        _this.setProperties({
                                                    date            : '',
                                                    amount          : '',
                                                    payee           : '',
                                                    paidTo          : '',
                                                    description     : '',
                                        });
                                        _this.set('expence', expence);
                                        _this.transitionToRoute('expence');
                                      });

                                    },
                      changePayee : function()
                                    {
                                      console.log(this);
                                      var model = this.get('expence');
                                      model.payee = this.get('payee');
                                    },
                      addPaidTo  :  function(newSelection)
                                    {
                                      var model = this.get('expence');
                                      var paidTo = [];
                                      newSelection.forEach(function(person){
                                          paidTo.push(person);
                                      });
                                      model.paidTo = paidTo;
                                    },
                    closePopup   :  function()
                                    {
                                      this.transitionToRoute('expence');
                                    }
                  }
});
