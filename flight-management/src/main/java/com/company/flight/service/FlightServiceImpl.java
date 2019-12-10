package com.company.flight.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.flight.model.FlightDetail;
import com.company.flight.repository.FlightDetailDaoImpl;

@Service
public class FlightServiceImpl {

	@Autowired
	FlightDetailDaoImpl flightDao;

	public List<FlightDetail> getAllFlights() {
		return flightDao.getAllFlightsFromDb();
	}
}