package com.example.BookExchange.app.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BookExchange.app.model.ExchangeRequest;
import com.example.BookExchange.app.repo.ExchangeRequestsRepository;

import java.util.List;

@Service
public class ExchangeRequestsService {

    @Autowired
    private ExchangeRequestsRepository exchangeRequestsRepository;

    public List<ExchangeRequest> getAllExchangeRequests(Integer id) {
        return exchangeRequestsRepository.getAllExchangeRequests(id);
    }

    public ExchangeRequest getExchangeRequestById(Integer id) {
        return exchangeRequestsRepository.findById(id).orElse(null);
    }

    public ExchangeRequest addExchangeRequest(ExchangeRequest exchangeRequest) {
        return exchangeRequestsRepository.save(exchangeRequest);
    }

    public ExchangeRequest updateExchangeRequest(ExchangeRequest exchangeRequest) {
        return exchangeRequestsRepository.save(exchangeRequest);
    }

    public void deleteExchangeRequest(Integer id) {
        exchangeRequestsRepository.deleteById(id);
    }

	public List<ExchangeRequest> getAllRequestsForAUser(Integer id) {
		return exchangeRequestsRepository.getAllRequestsForAUser(id);
	}

	public List<ExchangeRequest> getAllRequestsFromUser(Integer id) {
		return exchangeRequestsRepository.getAllRequestsFromUser(id);
	}
}